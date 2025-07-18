import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {


  // Rutas de la aplicacion 

  static get routes(): Router{

    const router  = Router();

    router.use('/api/todos', TodoRoutes.routes);

    return router;

  }

}