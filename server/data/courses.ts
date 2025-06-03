import { Course } from '../models/Course';
import { v4 as uuidv4 } from 'uuid';

let courses: Course[] = [];

export const getCourses = (): Course[] => {
  return courses;
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const createCourse = (course: Omit<Course, 'id'>): Course => {
  const newCourse = { ...course, id: uuidv4() };
  courses.push(newCourse);
  return newCourse;
};

export const updateCourse = (id: string, updates: Partial<Course>): Course | null => {
  const index = courses.findIndex(course => course.id === id);
  if (index === -1) return null;
  
  const updatedCourse = { ...courses[index], ...updates };
  courses[index] = updatedCourse;
  return updatedCourse;
};

export const deleteCourse = (id: string): boolean => {
  const initialLength = courses.length;
  courses = courses.filter(course => course.id !== id);
  return courses.length !== initialLength;
};
