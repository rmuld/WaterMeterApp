import pool from '../../database';
import { INewUser, IUser, IUserWithoutPassword } from "../interfaces/usersInterfaces";
import { users } from '../mockData/mockData';
import hashService from "./hashService";

const getUserById = (id: number): IUser | undefined => {
    let user: IUser | undefined = users.find(e => e.id === id);
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

const getAllUsers = async () => {
    // const usersWithoutPassword = users.map(user => {
    //     const userWithoutPassword = userServices.getUserWithoutPassword(user);
    //     return userWithoutPassword;
    // });
    const [u]  = await pool.query('select * from Users limit 10;')
    console.log('users: ', u)
    return u;
};
    
const createUser = async (newUser: INewUser): Promise<number> => {
    const id = users.length + 1;
    const hashedPassword = await hashService.hash(newUser.password)
    console.log(hashedPassword)
    
    users.push({id, ...newUser, password: hashedPassword});
    return id;
}

const getUserByEmail = async(email: string): Promise<IUser | undefined> => {
    const user = users.find(e => e.email === email);
    return user;
}

const updateUser = (userToUpdate: IUser): Boolean => {
    const { id, firstName, lastName, personalNumber, email, password, phone, role } = userToUpdate;
    const user = userServices.getUserById(id);
    if (user && firstName) user.firstName = firstName;
    if (user && lastName) user.lastName = lastName;
    if (user && personalNumber) user.personalNumber = personalNumber;
    if (user && email) user.email = email;
    if (user && password) user.password = password;
    if (user && phone) user.phone = phone;
    if (user && role) user.role = role;
    return true;
}

const deleteUser = (id: number): Boolean => {
    const index = users.findIndex(e => e.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
}

const userServices = {
    getAllUsers,
    getUserWithoutPassword,
    getUserById,
    getUserByEmail, 
    unknownUser,
    createUser,
    updateUser,
    deleteUser
}

export default userServices;