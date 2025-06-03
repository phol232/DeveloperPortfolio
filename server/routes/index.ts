import { FastifyInstance } from "fastify";
import Fastify from "fastify";
import { courseRoutes } from "./courseRoutes";
// Import other routes as needed

export async function registerRoutes(app: any): Promise<FastifyInstance> {
  const server = Fastify({ logger: false });
  
  // Register routes
  await server.register(courseRoutes);
  // Register other routes
  
  // Handle API proxying
  app.all("/api/*", (req, res) => {
    const url = req.url.replace(/^\/api/, "");
    server.inject({
      method: req.method,
      url,
      headers: req.headers as any,
      payload: req.body,
    }).then((response) => {
      res.status(response.statusCode).send(response.payload);
    });
  });
  
  return server;
}
