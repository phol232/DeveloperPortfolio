import React, { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Users, DollarSign, Search, Filter, RefreshCw } from "lucide-react";
import { apiService, Course } from "@/lib/api";
import { motion } from "framer-motion";

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

    // Cargar cursos con useCallback para poder referenciar desde otros efectos
    const loadCourses = useCallback(async () => {
        setLoading(true);
        try {
            const coursesData = await apiService.getCourses();
            // Only show active courses to public
            const activeCourses = coursesData.filter(course => course.estado === "Active");
            setCourses(activeCourses);
            setLastUpdate(Date.now());
        } catch (error) {
            setError("Error al cargar los cursos");
            console.error("Error loading courses:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Cargar cursos inicialmente
    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    // Refresh cuando la página se vuelve visible (ej. cambiar de tab)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                loadCourses();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [loadCourses]);

    // Escuchar cambios de cursos desde el panel de administración
    useEffect(() => {
        const handleCourseUpdate = (event: CustomEvent) => {
            console.log('Course update detected:', event.detail);
            // Recargar cursos cuando hay cambios desde el admin
            loadCourses();
        };

        window.addEventListener('courseUpdated', handleCourseUpdate as EventListener);
        return () => window.removeEventListener('courseUpdated', handleCourseUpdate as EventListener);
    }, [loadCourses]);

    const categories = Array.from(new Set(courses.map(course => course.categoria)));

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || course.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 mt-16">
                {/* Hero Section */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Cursos <span className="text-primary">Online</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Descubre nuestra amplia gama de cursos diseñados para impulsar tu carrera profesional
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className="flex flex-col md:flex-row gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Buscar cursos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las categorías</SelectItem>
                                {categories.map(category => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={loadCourses}
                            disabled={loading}
                            className="flex items-center gap-2"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Actualizar
                        </Button>
                    </div>
                </motion.div>

                {/* Last update indicator */}
                <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">
                        Última actualización: {new Date(lastUpdate).toLocaleTimeString()}
                    </p>
                </div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Cursos Disponibles</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{filteredCourses.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {courses.reduce((sum, course) => sum + (course.estudiantes || 0), 0).toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Desde</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${Math.min(...courses.map(course => course.precio || 0)).toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Cargando cursos...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-16">
                        <p className="text-red-500 mb-4">{error}</p>
                        <Button onClick={loadCourses}>Reintentar</Button>
                    </div>
                )}

                {/* Courses Grid */}
                {!loading && !error && (
                    <>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            {filteredCourses.map((course, index) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card className="h-full border-primary/20 hover:border-primary/40 transition-colors">
                                        <CardHeader>
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge className={getStatusColor(course.estado || "Draft")}>
                                                    {course.estado}
                                                </Badge>
                                                <span className="text-2xl font-bold text-primary">
                          ${course.precio?.toLocaleString()}
                        </span>
                                            </div>
                                            <CardTitle className="text-xl mb-2">{course.nombre}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                Por: {course.instructor}
                                            </p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Categoría:</span>
                                                    <Badge variant="outline">{course.categoria}</Badge>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Estudiantes:</span>
                                                    <span className="font-medium">{course.estudiantes || 0}</span>
                                                </div>
                                                {course.creador && (
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">Creado por:</span>
                                                        <span className="font-medium">{course.creador}</span>
                                                    </div>
                                                )}
                                                <Button className="w-full mt-4">
                                                    Ver Detalles
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* No Results */}
                        {filteredCourses.length === 0 && (
                            <div className="text-center py-16">
                                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No se encontraron cursos</h3>
                                <p className="text-muted-foreground">
                                    Intenta ajustar los filtros de búsqueda
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedCategory("all");
                                    }}
                                    className="mt-4"
                                >
                                    Limpiar filtros
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}