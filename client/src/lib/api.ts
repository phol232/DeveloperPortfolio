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
  user_id: number;
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
    return this.request<ApiResponse>('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterData): Promise<ApiResponse> {
    return this.request<ApiResponse>('/auth/register.php', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCourses(): Promise<Course[]> {
    return this.request<Course[]>('/cursos/listar.php');
  }

  async createCourse(course: Course): Promise<ApiResponse> {
    // Validate required fields
    if (!course.nombre || !course.instructor || !course.categoria || !course.precio) {
      throw new Error('Todos los campos son necesarios');
    }

    // Verificar que el usuario esté autenticado con token
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Usuario no autenticado - token no encontrado');
    }

    // Make sure user_id is included - crucial for your PHP backend
    if (!course.user_id) {
      // Get user_id from localStorage if available
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        course.user_id = user.user_id;
      } else {
        throw new Error('Usuario no autenticado - datos de usuario no encontrados');
      }
    }

    // Set default values for optional fields
    course.estudiantes = course.estudiantes || 0;
    course.estado = course.estado || 'Draft';

    console.log('Creating course with data:', course);

    console.log("=== API createCourse INICIADO ===");
    console.log("URL:", `${API_BASE_URL}/cursos/crear.php`);
    console.log("Data a enviar:", JSON.stringify(course, null, 2));

    try {
      const response = await fetch(`${API_BASE_URL}/cursos/crear.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response text:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const jsonResponse = await response.json();
      console.log("Response JSON:", JSON.stringify(jsonResponse, null, 2));
      return jsonResponse;
    } catch (error) {
      console.error('=== ERROR EN API createCourse ===');
      console.error('Error creating course:', error);
      console.error('Error type:', typeof error);
      throw error;
    }
  }

  async updateCourse(course: Course): Promise<ApiResponse> {
    // Verificar que el usuario esté autenticado con token
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Usuario no autenticado - token no encontrado');
    }

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
          'Authorization': `Bearer ${token}`,
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