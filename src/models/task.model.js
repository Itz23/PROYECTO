import mongoose, { mongo } from "mongoose";
//import { number } from "zod";
const taskSchema = new mongoose.Schema({

  status:{//estado del equipo
    type: String,
    required: true,
  },
  received:{
    type: String,
    required: true,
  },
  user:{//usuario que recibe en sistemas
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  date:{
    type: Date,
    default: Date.now,
  },
  serialNumber:{//numero de serie - puede llevar mins,numeros,letras, que tenga todo xd
    type: String,
    required: true,
  },
  brand: {//marca del equipo - validar que sean minusculas
    type: String,
    required: true,
  },
  agency:{//agencia - validar que sean minusculas
    type: String,
    required: true,
  },
  department:{//departamento - validar que sean minusculas
    type: String,
  required: true,
  },
  hardware:{//haswer xd - validar que sean minusculas, que NO lleve numeros
    type: String,
    required: true,
  },
  model:{ // minusculas, mayusculas, numeros y -
    type: String,
    required:true, 
  },
  processor:{//procesador - todos los caracteres
    type: String,
    required: false,
  },
  opeSystem:{//sistema operativo - todos los caracteres
    type: String,
    required: false,
  },
  hardDisc:{//disco duro - numeros y letras
    type: String,
    required: false,
  },
  ram:{//memoriar ram - solo numeros  
    type: String,
    required: false,
  },
  ethernet:{//direccion ethernet - todos los caracteres, validar que solo sean mayusculas, solo guiones - medios o dos puntos: 
    type: String,
    required: false,
  },
  wifi:{//direccion ethernet - todos los caracteres, validar que solo sean mayusculas, solo guiones - medios o dos puntos: 
    type: String,
    required: false,
  },
  changes:{//se realizó - validar que solo sean letras 
    type: String,
    required: false,
  },
  reporter: { //nuevos campos en la base 
    type: String,
    required: false,
   },
diagnostic: {
   type: String,
   required: false,
  },
finalStatus: {
   type: String, 
   required: false,
  },
reportedIssue: { 
  type: String, 
  required: false,
},
workDone: { 
  type: String, 
  required: false,
},

},  
{
    timestamps: true,//almacenar y recuperar fechas en formato de timestamp
});

export  default mongoose.model("Task", taskSchema); 