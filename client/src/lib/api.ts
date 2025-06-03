const API_BASE_URL = 'https://tecno-express.shop/BACKEND';

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
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  user_id?: number;
  nombre?: string;
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
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
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
    return this.request<ApiResponse>('/cursos/crear.php', {
      method: 'POST',
      body: JSON.stringify(course),
    });
  }

  async updateCourse(course: Course): Promise<ApiResponse> {
    return this.request<ApiResponse>('/cursos/editar.php', {
      method: 'POST',
      body: JSON.stringify(course),
    });
  }

  async deleteCourse(id: number): Promise<ApiResponse> {
    return this.request<ApiResponse>('/cursos/eliminar.php', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  }
}

export const apiService = new ApiService();