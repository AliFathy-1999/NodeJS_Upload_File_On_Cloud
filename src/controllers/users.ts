import { Request, Response , NextFunction } from "express";
const User = require('../DB/models/users')
import jwt from 'jsonwebtoken'
import { IUser } from "../types/schemasType";
import HttpStatusCode from "../types/http-status-code";
import bcryptjs from "bcryptjs"; 
const {ApiError} = require("../lib/index");

const generateToken = (user:IUser)=>{
    const TOKEN_KEY = process.env.TOKEN_KEY as string
    const token = jwt.sign(
        { 
            userId:user._id,
            email:user.email,
            role : user.role
        },
        TOKEN_KEY,
        { expiresIn: process.env.EXPIRES_IN }
    )
    return token;
}

const signIn = async (req:Request,res:Response,next:NextFunction) => {

        const { body : { email , password }} = req
        const user = await User.findOne({email});
        if (!user) 
            throw new ApiError('Invalid Email', HttpStatusCode.UNAUTHORIZED);

        const valid = bcryptjs.compareSync(password, user.password);
        if (!valid)
            throw new ApiError('Invalid Password', HttpStatusCode.UNAUTHORIZED);
        res.status(HttpStatusCode.OK).json({status:'success', token: generateToken(user), user});        
}
const register = async (req: Request, res: Response, next: NextFunction) => {
        const pImage = req.file? req.file.path : undefined    
        const { firstName , lastName, userName , email, password  } = req.body;
        
        const user = await User.create({ firstName , lastName, userName , email, password , pImage })
        res.status(HttpStatusCode.CREATED).json({
            status: 'success',
            user
        })
    

}

export  {
    register,
    signIn,
}