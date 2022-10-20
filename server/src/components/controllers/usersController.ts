import { Request, Response } from 'express';
import { INewUser, IUser } from "../interfaces/usersInterfaces";
import userServices from '../services/userServices';


 const getAllUsers = (req: Request, res: Response) => {
    const usersWithoutPassword = userServices.getAllUsers();
    res.status(200).json({
        success: true,
        message: 'List of users',
        users: usersWithoutPassword,
    });
}

const getUserById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let user: IUser | undefined = userServices.getUserById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    const userWithoutPassword = userServices.getUserWithoutPassword(user);

    return res.status(200).json({
        success: true,
        message: `User`,
        data: {
            user: userWithoutPassword
        },
    });
};

const updateUser = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, password, personalNumber, phone, role } = req.body;
    const user: IUser | undefined = userServices.getUserById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    if (!firstName && !lastName && !email && !password && !personalNumber && !phone && !role) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    const userToUpdate: IUser = {
        id,
        firstName,
        lastName,
        email,
        password,
        personalNumber,
        phone,
        role
    }

    userServices.updateUser(userToUpdate);

    return res.status(200).json({
        success: true,
        message: `User ${firstName} ${lastName} updated`,
    });
};

const createNewUser = async (req: Request, res: Response) => {
    const { firstName, lastName, personalNumber, email, password, phone } = req.body;
    const newUser: INewUser = {
        firstName,
        lastName,
        email,
        password,
        personalNumber,
        phone,
        role: "User"
    }
    const id = await userServices.createUser(newUser);

    return res.status(201).json({
        success: true,
        message: `User with id ${id} created`,
    });
};

const deleteUserById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = userServices.deleteUser(id);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    
    return res.status(200).json({
        success: true,
        message: `User deleted`,
    });
};

const usersControllers = {
    getAllUsers,
    getUserById,
    updateUser,
    createNewUser,
    deleteUserById,
}


export default usersControllers;