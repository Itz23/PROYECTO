//esta funcion sirve para validar que datos contiene el token, si el programa lo autoriza o no,  
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
export const authRequired = (req,res,next)=> {
    const {token}= req.cookies;
    if(!token) return res.status(401).json({message:"no token, autoritation denied"});
    //console.log(cookies);
    jwt.verify(token,TOKEN_SECRET,(err,user)=>{
        if(err) return res.status(403).json({menssage: "invalid token" });
    
        req.user= user; 
        next();
    })
};