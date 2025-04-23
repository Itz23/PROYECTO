import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { fullname, email, password, username } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound)
            return res.status(400).json(["the email is already in use "]);
        //ejecutar bcrypt, el motodo hash sirve para poder encriptar una contraseña
        const passwordHash = await bcrypt.hash(password, 10);
        //crear un usuario utilizando objetos (poo) para poder cambiar su comportamiento más facil
        const newUser = new User({
            fullname,
            email,
            password: passwordHash,
            username
        });
        //para guardar un usuario se aplica el metodo save al objeto User
        const userSaved = await newUser.save();
        //permite el acceso al token una vez importado de ../libs/jwt.js'
        const token = await createAccessToken({ id: userSaved._id })
        //un Token: es un string que recibe de forma adicional el frontend, cuando el usuario pida una accion, se requerirá el token para permitirle continuar*/
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            fullname: userSaved.fullname,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //buscar un usuario
        const userSaved = await User.findOne({ email });
        if (!userSaved) return res.status(400).json({ message: "User not found" });
        //comparar el usuario con la contraseña si si se encontró el usuario
        //isMatch es una constante para guardar si son compatibles los datos 
        const isMatch = await bcrypt.compare(password, userSaved.password);

        //si las contraseñas no coinciden:
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        //permite el acceso al token una vez importado de ../libs/jwt.js'
        const token = await createAccessToken({ id: userSaved._id })
        //un Token: es un string que recibe de forma adicional el frontend, cuando el usuario pida una accion, se requerirá el token para permitirle continuar*/
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            fullname: userSaved.fullname,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
//este codigo logout sirve para cancelar el token 
export const logout = (req, res) => {

    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userSaved = await User.findById(req.user.id)
    if (!userSaved) return res.status(400).json({ menssage: "user not found" });

    return res.json({
        id: userSaved._id,
        fullname: userSaved.fullname,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updateAt: userSaved.updatedAt
    });
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "Unauthorized" });
        
        return res.json({
            id: userFound._id,
            fullname: userFound.fullname,
            username: userFound.username,
            email: userFound.email,
        });
    });
};





