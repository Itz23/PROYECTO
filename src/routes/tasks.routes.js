//esta seccion es para conectar las rutas (y archivos) del programa parte de las tareas (tambien podría ser para los formularios)

import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
    getTasks,
    getTask,
    createTask,  
    updateTask,
    deleteTask,
    searchTasks,
 } from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schemas.js";

const router = Router()

router.get('/tasks', authRequired, getTasks);

router.get('/tasks/:id',authRequired, getTask);

router.get('/search', authRequired, searchTasks);

router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);

router.delete('/tasks/:id', authRequired, deleteTask);

router.put('/tasks/:id', authRequired, updateTask);

export default router;