//validar campos de registro y login (también para los formularios xd, e importa la libreria zod que sirve para validar datos)
import {z} from 'zod'
export const registerSchema = z.object({

    fullname: z.string({
        required_error: "fullname is required"
    }).regex(/^[a-zA-Z\s]+$/,{
        message: "enter only letters in the fullname"
    }),
    username: z.string({ 
        required_error: "username is required"
    }),
    email: z.string({ 
        required_error: "Email is required"
    }).email({
        message: 'Invalid email'
    }),   
    password: z.string({ 
        required_error: "Password is required"
    }).min(3,{
        message: "Password must be at least 3-9 characters",
    }).max(9,{
        message: "Password must be at least 3-9 caracters", 
    })
});  

export const loginSchema = z.object({

    

    email: z.string({ 
    required_error: "email  is required"
    }).email({
        message: 'El email no es valido'
    }),   
    password: z.string({ 
    required_error: "Password is required"
    }).min(3,{
        message: "Password must be at least 3-9 caracters",
    }).max(9,{
        message: "Password must be at least 3-9 caracters", 
    })
});




