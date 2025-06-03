import React, { useState, useEffect } from "react";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Plus, Edit, Trash2, X, BookOpen, Users, DollarSign, TrendingUp, MoreHorizontal
} from "lucide-react";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
import { apiService, Course } from "@/lib/api";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AdminPanelProps {
  onClose: () => void;
  onLogout: () => void;
  userData: {
    user_id: number;
    nombre: string;
    email: string;
  } | null;
}

export function AdminPanel({ onClose, onLogout, userData }: AdminPanelProps) {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({
    nombre: "",
    instructor: "",
    categoria: "",
    precio: 0,
    estudiantes: 0,
    estado: "Draft"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const coursesData = await apiService.getCourses();
      setCourses(coursesData);
    } catch (error) {
      setError("Error al cargar los cursos");
      console.error("Error loading courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async () => {
    if (!userData) return;

    if (!newCourse.nombre || !newCourse.instructor || !newCourse.categoria || !newCourse.precio) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const courseData = {
        nombre: newCourse.nombre,
        instructor: newCourse.instructor,
        categoria: newCourse.categoria,
        precio: newCourse.precio,
        estudiantes: newCourse.estudiantes,
        estado: newCourse.estado,
        user_id: userData.user_id
      };

      const response = await apiService.createCourse(courseData);

      if (response.success) {
        await loadCourses();
        setNewCourse({
          nombre: "",
          instructor: "",
          categoria: "",
          precio: 0,
          estudiantes: 0,
          estado: "Draft"
        });
        setShowAddModal(false);
        setSuccessMsg("¡Curso agregado exitosamente!");
        setTimeout(() => setSuccessMsg(""), 2000);
      } else {
        setError(response.message || "Error al crear el curso");
      }
    } catch (error) {
      setError("Error de conexión al crear el curso");
      console.error("Error creando curso:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setNewCourse({
      nombre: course.nombre,
      instructor: course.instructor,
      categoria: course.categoria,
      precio: course.precio,
      estudiantes: course.estudiantes || 0,
      estado: course.estado || "Draft"
    });
    setShowEditModal(true);
  };

  const handleUpdateCourse = async () => {
    if (!selectedCourse || !userData) return;

    if (newCourse.nombre && newCourse.instructor && newCourse.categoria && newCourse.precio) {
      setLoading(true);
      setError("");
      try {
        const courseData = {
          nombre: newCourse.nombre,
          instructor: newCourse.instructor,
          categoria: newCourse.categoria,
          precio: newCourse.precio,
          estudiantes: newCourse.estudiantes,
          estado: newCourse.estado,
          id: selectedCourse.id,
          user_id: userData.user_id
        };

        const response = await apiService.updateCourse(courseData);

        if (response.success) {
          await loadCourses();
          setSelectedCourse(null);
          setNewCourse({
            nombre: "",
            instructor: "",
            categoria: "",
            precio: 0,
            estudiantes: 0,
            estado: "Draft"
          });
          setShowEditModal(false);
        } else {
          setError(response.message || "Error al actualizar el curso");
        }
      } catch (error) {
        setError("Error de conexión al actualizar el curso");
        console.error("Error updating course:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteCourse = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      const response = await apiService.deleteCourse(id);

      if (response.success) {
        await loadCourses();
        setShowDeleteModal(false);
      } else {
        setError(response.message || "Error al eliminar el curso");
      }
    } catch (error) {
      setError("Error de conexión al eliminar el curso");
      console.error("Error deleting course:", error);
    } finally {
      setLoading(false);
      setSelectedCourse(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCourses = courses.filter(course =>
      course.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalStudents = courses.reduce((sum, course) => sum + (course.estudiantes || 0), 0);
  const totalRevenue = courses.reduce((sum, course) => sum + ((course.precio || 0) * (course.estudiantes || 0)), 0);
  const activeCourses = courses.filter(course => course.estado === "Active").length;

  return (
      <div className="fixed inset-0 bg-background z-50 overflow-auto">
        <div className="border-b bg-white">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Panel Administrativo</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-transparent" onClick={onClose}>
                <X className="h-4 w-4" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/api/placeholder/32/32" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onLogout}>
                    <X className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {successMsg && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
                {successMsg}
              </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cursos</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {activeCourses} activos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12% desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +8% desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% desde el mes pasado
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gestión de Cursos</CardTitle>
                <button onClick={() => setShowAddModal(true)} disabled={loading} className="btn-primary flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Curso
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {/* ... aquí va el table o los cards, igual que antes ... */}
              {/* ... (no lo repito para ahorrar espacio, igual lo puedes copiar/pegar) ... */}
            </CardContent>
          </Card>

          {/* Add Course Modal */}
          <Dialog open={showAddModal} onOpenChange={(open) => {
            setShowAddModal(open);
            setError("");
          }}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Curso</DialogTitle>
              </DialogHeader>
              {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
              )}
              <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddCourse();
                  }}
                  className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Curso</Label>
                  <Input
                      id="name"
                      value={newCourse.nombre}
                      onChange={(e) => setNewCourse({ ...newCourse, nombre: e.target.value })}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                      id="instructor"
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Input
                      id="category"
                      value={newCourse.categoria}
                      onChange={(e) => setNewCourse({ ...newCourse, categoria: e.target.value })}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio</Label>
                  <Input
                      id="price"
                      type="number"
                      value={newCourse.precio}
                      onChange={(e) => setNewCourse({ ...newCourse, precio: Number(e.target.value) })}
                      required
                      min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select value={newCourse.estado} onValueChange={(value) => setNewCourse({ ...newCourse, estado: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <button type="button" className="btn-outline" onClick={() => setShowAddModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Procesando..." : "Agregar Curso"}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Edit Course Modal */}
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Editar Curso</DialogTitle>
              </DialogHeader>
              {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
              )}
              <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateCourse();
                  }}
                  className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre del Curso</Label>
                  <Input
                      id="edit-name"
                      value={newCourse.nombre}
                      onChange={(e) => setNewCourse({ ...newCourse, nombre: e.target.value })}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-instructor">Instructor</Label>
                  <Input
                      id="edit-instructor"
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Categoría</Label>
                  <Input
                      id="edit-category"
                      value={newCourse.categoria}
                      onChange={(e) => setNewCourse({ ...newCourse, categoria: e.target.value })}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Precio</Label>
                  <Input
                      id="edit-price"
                      type="number"
                      value={newCourse.precio}
                      onChange={(e) => setNewCourse({ ...newCourse, precio: Number(e.target.value) })}
                      required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Estado</Label>
                  <Select value={newCourse.estado} onValueChange={(value) => setNewCourse({ ...newCourse, estado: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <button type="button" className="btn-outline" onClick={() => setShowEditModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? "Procesando..." : "Guardar Cambios"}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Delete Course Modal */}
          {/* ... tu modal de eliminar puede seguir igual ... */}
        </div>
      </div>
  );
}
