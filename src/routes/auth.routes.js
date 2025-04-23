//esta seccion es para conectar las rutas (y archivos) del programa parte del login, registro (autenticacion de usuarios)
import { Router } from "express";/* esto son las rutas relacionadas con la verificacion de los datos de login y registro entre otros*/
import { 
        login, 
        register, 
        logout, 
        profile,
        verifyToken 
    } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema} from "../schemas/auth.schema.js";

const router = Router();//constructor (poo: programacion orientada a objetos )

    router.post('/register', validateSchema(registerSchema),register);

    router.post('/login',validateSchema(loginSchema),login);
    
    router.post("/logout", logout);

    router.get("/verify", verifyToken);

    router.get("/profile",authRequired, profile);


//se tiene que exportar el router para poder importarlo a app.js
    export default router;


    