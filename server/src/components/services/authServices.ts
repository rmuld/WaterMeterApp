
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/usersInterfaces';

const saltRounds = process.env.SALTROUNDS || 10;
const jwtSecret = process.env.JWT_SECRET || "";

const authServices = {
    hash:async (password:string): Promise<string> => {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log("hash: ", hash)
        return hash;
    },
    compare:async (password:string, hash: string): Promise<boolean> => {
        const match = await bcrypt.compare(password, hash);
        console.log("match: ", match)
        return match
    },
    sign:async (user:IUser): Promise<string> => {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        }
        const token = await jwt.sign(payload, jwtSecret, { expiresIn: '4h' });
        console.log("token: ", token)
        return token
    },
    verify:async (token:string) => {
        const decoded = await jwt.verify(token, jwtSecret);
        console.log("decoded: ", decoded)
        return decoded
    }

}

export default authServices;