import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, User, Mail, Eye, EyeOff } from "lucide-react";
import { apiService } from "@/lib/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: { user_id: number; nombre: string }) => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    nombre: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== handleLogin iniciado ===");
    console.log("Login data:", loginData);

    setIsLoading(true);
    setError("");

    try {
      const response = await apiService.login(loginData);
      console.log("=== handleLogin response ===");
      console.log("Login response:", JSON.stringify(response, null, 2));

      // Verificar si el login fue exitoso
      if (response && response.success) {
        console.log("=== LOGIN EXITOSO ===");

        // Verificar que tenemos los datos del usuario
        if (response.user && response.user.user_id && response.user.nombre) {
          console.log("User data found:", response.user);

          // Guardar token si existe
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            console.log("Token saved to localStorage");
          }

          // Llamar onSuccess con los datos del usuario y token
          const userData = {
            user_id: response.user.user_id,
            nombre: response.user.nombre,
            email: response.user.email || loginData.email,
            token: response.token
          };

          console.log("Calling onSuccess with userData:", userData);
          onSuccess(userData);

        } else {
          console.error("User data missing in response:", response);
          setError("Error: Datos de usuario incompletos en la respuesta del servidor");
        }
      } else {
        console.error("Login failed:", response);
        setError(response?.message || "Error en el login - respuesta no exitosa");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(`Error de conexión: ${error?.message || 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
      console.log("=== handleLogin finalizado ===");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.register({
        email: registerData.email,
        password: registerData.password,
        nombre: registerData.nombre
      });

      if (response.success) {
        // Después del registro exitoso, hacer login automático
        const loginResponse = await apiService.login({
          email: registerData.email,
          password: registerData.password
        });

        if (loginResponse.success && loginResponse.user_id && loginResponse.nombre) {
          const userData = {
            user_id: loginResponse.user_id,
            nombre: loginResponse.nombre,
            email: registerData.email,
            token: loginResponse.token // Guardar el token JWT
          };
          console.log("=== Saving user data to localStorage ===");
          console.log("User data to save:", userData);
          localStorage.setItem('user', JSON.stringify(userData));

          // Guardar también el token por separado para fácil acceso
          localStorage.setItem('auth_token', loginResponse.token);

          console.log("User data saved successfully");
          onSuccess(userData);
          onClose();
        }
      } else {
        setError(response.message || "Error al crear la cuenta");
      }
    } catch (error) {
      setError("Error de conexión. Verifique su conexión a internet.");
      console.error("Register error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Acceso Administrativo
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Iniciar Sesión
                  </CardTitle>
                  <CardDescription>
                    Ingresa tus credenciales para acceder al panel administrativo
                  </CardDescription>
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register" className="mt-6">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Crear Cuenta
                  </CardTitle>
                  <CardDescription>
                    Crea una nueva cuenta de administrador
                  </CardDescription>
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="Tu nombre completo"
                          className="pl-10"
                          value={registerData.nombre}
                          onChange={(e) => setRegisterData({...registerData, nombre: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="admin@ejemplo.com"
                          className="pl-10"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}