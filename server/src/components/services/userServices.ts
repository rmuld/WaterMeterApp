import { INewUser, IUser, IUserWithoutPassword } from "../interfaces/usersInterfaces";
import { users } from '../mockData/mockData';
import hashService from "./hashService";
import pool from "../../database";


const getUserById = (id: number): IUser | undefined => {
    let user: IUser | undefined = users.find(element => element.id === id);
    return user;
};


const getUserWithoutPassword = (user: IUser): IUserWithoutPassword => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        personalNumber: user.personalNumber,
        phone: user.phone,
        role: user.role
    };
};

const unknownUser = (): IUser => {
    return {
            id: 0,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@doe.com',
            password: 'jane',
            personalNumber: 4568008009,
            phone: "55676869",
            role: "User"
        };
};

const getAllUsers = () => {
    const usersWithoutPassword = users.map(user => {
        const userWithoutPassword = userServices.getUserWithoutPassword(user);
        return userWithoutPassword;
    });
}
    
const createUser = async (newUser: INewUser): Promise<number> => {
    const id = users.length + 1;
    const hashedPassword = await hashService.hash(newUser.password)
    
    users.push({id, ...newUser, password: hashedPassword});
    return id;
}

const getUserByEmail = async(email: string): Promise<IUser | undefined> => {
    const user = users.find(e => e.email === email);
    return user;
}

const userServices = {
    getUserById,
    getUserByEmail, 
    getUserWithoutPassword,
    unknownUser,
    getAllUsers,
    createUser
}

export default userServices;