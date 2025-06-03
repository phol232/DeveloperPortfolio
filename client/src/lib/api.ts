const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://tecno-express.shop/BACKEND';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
}

export interface Course {
  id?: number;
  nombre: string;
  instructor: string;
  categoria: string;
  precio: number;
  estudiantes?: number;
  estado?: string;
  user_id?: number; // Optional now since backend doesn't require it
  created_at?: string;
  updated_at?: string;
  creador_email?: string;
  creador?: string;
  image?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  user_id?: number;
  nombre?: string;
  error?: string; // Add error field for better error handling
  data?: any; // Añadir propiedad data para respuestas del API
  token?: string; // Token para autenticación
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    // Obtener el token JWT del localStorage
    const token = localStorage.getItem('auth_token');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // Agregar token si existe
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log('API Request:', url, config); // Log request details
      const response = await fetch(url, config);
      const data = await response.json();

      console.log('API Response:', data); // Log the response

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse> {
    console.log("=== LOGIN INICIADO ===");
    console.log("URL:", `${API_BASE_URL}/auth/login.php`);
    console.log("Credentials:", credentials);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log("Login response status:", response.status);
      console.log("Login response ok:", response.ok);

      const responseText = await response.text();
      console.log("Raw login response:", responseText);

      // Check if response contains HTML (PHP errors)
      if (responseText.includes('<br') || responseText.includes('<b>')) {
        console.error("PHP Error detected in response:", responseText);
        throw new Error("Error del servidor: El backend tiene errores de PHP. Revisa los logs del servidor.");
      }

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.error("Response was:", responseText);
        throw new Error(`Respuesta inválida del servidor: ${responseText.substring(0, 100)}...`);
      }

      console.log("Login response JSON:", JSON.stringify(jsonResponse, null, 2));
      return jsonResponse;
    } catch (error) {
      console.error('=== ERROR EN LOGIN ===');
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(userData: RegisterData): Promise<ApiResponse> {
    console.log("=== REGISTER INICIADO ===");
    console.log("URL:", `${API_BASE_URL}/auth/register.php`);
    console.log("User data:", userData);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log("Register response status:", response.status);
      console.log("Register response ok:", response.ok);

      const responseText = await response.text();
      console.log("Raw register response:", responseText);

      // Check if response contains HTML (PHP errors)
      if (responseText.includes('<br') || responseText.includes('<b>')) {
        console.error("PHP Error detected in response:", responseText);
        throw new Error("Error del servidor: El backend tiene errores de PHP. Revisa los logs del servidor.");
      }

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.error("Response was:", responseText);
        throw new Error(`Respuesta inválida del servidor: ${responseText.substring(0, 100)}...`);
      }

      console.log("Register response JSON:", JSON.stringify(jsonResponse, null, 2));
      return jsonResponse;
    } catch (error) {
      console.error('=== ERROR EN REGISTER ===');
      console.error('Register error:', error);
      throw error;
    }
  }

  async getCourses(): Promise<Course[]> {
    // Añadir timestamp para evitar caché
    const timestamp = new Date().getTime();
    return this.request<Course[]>(`/cursos/listar.php?_=${timestamp}`);
  }

  async createCourse(course: Course): Promise<ApiResponse> {
    // Validate required fields
    if (!course.nombre || !course.instructor || !course.categoria || !course.precio) {
      throw new Error('Todos los campos son necesarios');
    }

    // Set default values for optional fields
    course.estudiantes = course.estudiantes || 0;
    course.estado = course.estado || 'Draft';

    console.log('Creating course with data:', course);

    console.log("=== API createCourse INICIADO ===");
    console.log("URL:", `${API_BASE_URL}/cursos/crear.php`);
    console.log("Data a enviar:", JSON.stringify(course, null, 2));

    // Añadir timestamp para evitar caché
    const timestamp = new Date().getTime();

    try {
      // Añadir timestamp para evitar caché
      const response = await fetch(`${API_BASE_URL}/cursos/crear.php?_=${timestamp}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        body: JSON.stringify(course),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const responseText = await response.text();
      console.log("Raw response text:", responseText);

      if (!response.ok) {
        console.log("Error response text:", responseText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
      }

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        console.error("Response was:", responseText);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }
      console.log("Response JSON:", JSON.stringify(jsonResponse, null, 2));
      return jsonResponse;
    } catch (error) {
      console.error('=== ERROR EN API createCourse ===');
      console.error('Error creating course:', error);
      throw error;
    }
  }

  async updateCourse(course: Course): Promise<ApiResponse> {
    // Ensure course includes id for the PHP backend to identify which course to update
    if (!course.id) {
      throw new Error('Course ID is required for updates');
    }

    console.log("=== API updateCourse INICIADO ===");
    console.log("URL:", `${API_BASE_URL}/cursos/editar.php`);
    console.log("Data a enviar:", JSON.stringify(course, null, 2));

    try {
      const response = await fetch(`${API_BASE_URL}/cursos/editar.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
        },
        body: JSON.stringify(course),
      });

      console.log("Update response status:", response.status);
      console.log("Update response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Update error response text:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const jsonResponse = await response.json();
      console.log("Update response JSON:", JSON.stringify(jsonResponse, null, 2));
      return jsonResponse;
    } catch (error) {
      console.error('=== ERROR EN API updateCourse ===');
      console.error('Error updating course:', error);
      throw error;
    }
  }

  async deleteCourse(id: number): Promise<ApiResponse> {
    // Your PHP endpoint expects an id in the request body
    return this.request<ApiResponse>('/cursos/eliminar.php', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  }

  // You might want to add a method to get a single course by ID if needed
  async getCourseById(id: number): Promise<Course> {
    return this.request<Course>(`/cursos/obtener.php?id=${id}`);
  }
}

export const apiService = new ApiService();