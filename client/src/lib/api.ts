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

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
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
    
    // Make sure user_id is included - crucial for your PHP backend
    if (!course.user_id) {
      // Get user_id from localStorage if available
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        course.user_id = user.user_id;
      } else {
        throw new Error('Usuario no autenticado');
      }
    }
    
    // Set default values for optional fields
    course.estudiantes = course.estudiantes || 0;
    course.estado = course.estado || 'Draft';
    
    console.log('Creating course with data:', course);
    
    return this.request<ApiResponse>('/cursos/crear.php', {
      method: 'POST',
      body: JSON.stringify(course),
    });
  }

  async updateCourse(course: Course): Promise<ApiResponse> {
    // Ensure course includes id for the PHP backend to identify which course to update
    if (!course.id) {
      throw new Error('Course ID is required for updates');
    }
    return this.request<ApiResponse>('/cursos/editar.php', {
      method: 'POST',
      body: JSON.stringify(course),
    });
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