import { z } from 'zod';
//esquema de las tareas: condiciona la informacion que debe contener la tarea (podría ser para los formularios xd)
export const createTaskSchema = z.object({
    status: z.string({
        required_error: "status is required",
    }),
    received: z.string({
        required_error: "received is required",
    }).regex(/^[a-z\s]+$/,{
        message: "uppercase and numbers are not allowed in received"
    }),
    serialNumber: z.string({
        required_error: "serialNumber is required",
    }).regex(/^[A-Z0-9\s]+$/,{
        message: "lowercase are not allowed in the serial Number"
    }),
    date: z.string().datetime().optional(),
    
    brand: z.string({
        required_error: "brand is required",
    }).regex(/^[a-z\s]+$/,{
        message: "uppercase and numbers are not allowed in brand"
    }),
    agency: z.string({
        required_error: "agency is required",
    }).regex(/^[a-z\s]+$/,{
        message: "uppercase and numbers are not allowed in agency"
    }),
    department: z.string({
        required_error: "department is required",
    }).regex(/^[a-z\s]+$/,{
        message: "uppercase and numbers are not allowed in department"
    }),
    hardware: z.string({
        required_error: "hardware is required",
    }).regex(/^[a-z\s]+$/,{
        message: "uppercase and numbers are not allowed in hardware"
    }),
    model: z.string({
        required_error: "model is required",
    }).regex(/^[A-Za-z0-9-\s]+$/,{
        message: " others characters are not allowed in model"
    }),
    processor: z.string().regex(/^[0-9a-z-\s]+$/,{
        message: "uppercase and others characters are not allowed in processor"
    }).optional(),
    
    opeSystem: z.string().regex(/^[0-9a-z\s]+$/,{
        message: "uppercase, other characters  and numbers are not allowed in operative system"
    }).optional(),

     hardDisc: z.string().regex(/^[0-9a-z\s]+$/,{
        message: "uppercase and others characters  are not allowed in hard disc"
    }).optional(),

    ram: z.string()
        .regex(/^[0-9\s]+$/,{
        message: "only numbers can be entered into ram"
    }).optional(),

    ethernet: z.string()
        .regex(/^[0-9A-Z-:\s]+$/,{
        message: "lowercase and others characters are not allowed in ethernet"
    }).optional(),
    
    wifi: z.string()
        .regex(/^[0-9A-Z-:\s]+$/,{
        message: "lowercase and others characters are not allowed in the Wifi"
    }).optional(),
    changes: z.string()
        .regex(/^[a-z0-9áéíóúñü,\s]+$/,{
        message: "uppercase others characters are not allowed in changes"
    }).optional(),
// informacion de usados 

    reporter: z.string({
        
    }).regex(/^[a-z\s]+$/, {
      message: "uppercase and numbers are not allowed in reporter"
    }).optional(),
    
    diagnostic: z.string({
      
    }).regex(/^[a-z\s]+$/, {
      message: "uppercase and numbers are not allowed in diagnostic"
    }).optional(),
    
    finalStatus: z.string({
      
    }).regex(/^[a-z\s]+$/, {
      message: "uppercase and numbers are not allowed in finalStatus"
    }).optional(),
    
    reportedIssue: z.string({
      
    }).regex(/^[a-z\s]+$/, {
      message: "uppercase and numbers are not allowed in reportedIssue"
    }).optional(),
    
    workDone: z.string({
      
    }).regex(/^[a-z\s]+$/, {
      message: "uppercase and numbers are not allowed in workDone"
    }).optional(),
    
  
});




