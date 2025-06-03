export interface Course {
  id: string;
  name: string;
  instructor: string;
  category: string;
  price: number;
  status: 'active' | 'inactive';
}
