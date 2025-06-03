import { FastifyInstance } from 'fastify';
import { 
  getCourses, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from '../data/courses';

export async function courseRoutes(fastify: FastifyInstance) {
  // Get all courses
  fastify.get('/api/courses', async (request, reply) => {
    return { courses: getCourses() };
  });
  
  // Get course by id
  fastify.get<{ Params: { id: string } }>('/api/courses/:id', async (request, reply) => {
    const { id } = request.params;
    const course = getCourseById(id);
    
    if (!course) {
      reply.code(404);
      return { message: 'Course not found' };
    }
    
    return { course };
  });
  
  // Create new course
  fastify.post<{ Body: Omit<import('../models/Course').Course, 'id'> }>('/api/courses', async (request, reply) => {
    const course = createCourse(request.body);
    reply.code(201);
    return { course };
  });
  
  // Update course
  fastify.put<{ Params: { id: string }, Body: Partial<import('../models/Course').Course> }>(
    '/api/courses/:id',
    async (request, reply) => {
      const { id } = request.params;
      const updatedCourse = updateCourse(id, request.body);
      
      if (!updatedCourse) {
        reply.code(404);
        return { message: 'Course not found' };
      }
      
      return { course: updatedCourse };
    }
  );
  
  // Delete course
  fastify.delete<{ Params: { id: string } }>('/api/courses/:id', async (request, reply) => {
    const { id } = request.params;
    const deleted = deleteCourse(id);
    
    if (!deleted) {
      reply.code(404);
      return { message: 'Course not found' };
    }
    
    return { message: 'Course deleted successfully' };
  });
}
