
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/usersInterfaces';

const saltRounds = process.env.SALTROUNDS || 10;
const jwtSecret = process.env.JWT_SECRET || "youwillneverknow"; //TODO


const hash = async (password:string): Promise<string> => {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("hash: ", hash)
    return hash;
}
const compare = async (password:string, hash: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hash);
    
    return match
}
const sign = async (user:IUser): Promise<string> => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    }
    const token = await jwt.sign(payload, jwtSecret, { expiresIn: '4h' });
    console.log("token: ", token)
    return token
}
const verify = async (token:string) => {
    const decoded = await jwt.verify(token, jwtSecret);    
    return decoded
}
const authServices = {
    hash,
    compare,
    sign,
    verify
}

export default authServices;