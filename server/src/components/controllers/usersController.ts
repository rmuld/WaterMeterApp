import { Request, Response } from 'express';
import { IUser } from "../interfaces/usersInterfaces";
import { users } from '../mockData/mockData';
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
    const { firstName, lastName, email, password, personalNumber, phone } = req.body;
    const user: IUser | undefined = userServices.getUserById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    if (!firstName && !lastName && !email && !password && !personalNumber && !phone) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;
    if (personalNumber) user.personalNumber = personalNumber;
    if (phone) user.phone = phone;

    return res.status(200).json({
        success: true,
        message: `User updated`,
    });
};

const createNewUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, personalNumber, phone } = req.body;
    const newUser = {
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
    const index = users.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    users.splice(index, 1);
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