import mongoose, { Schema } from "mongoose";
//este esquema es para decirle a mongo que es lo que va guardar, (colocar new para instaciar el objeto)
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String, 
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
},{
    timestamps:true
})
//se va a exportar el esquema para poder hacer consultas e interactuar con la bd
export default mongoose.model('User', userSchema); 