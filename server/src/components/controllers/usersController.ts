import { NextFunction, Request, Response } from 'express';
import { IUser } from "../interfaces/usersInterfaces";
import userServices from '../services/userServices';


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let users;
      
      if (res.locals.user.id === 1) {
        users = await userServices.getAllUsers();
      } else {
        const { id } = res.locals.user;
        users = await userServices.getUserById(id);
      }
  
      return res.status(200).json({
        success: true,
        message: 'List of users',
        users,
      });
  } catch (error) {
    next(error);
  }
}

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      
      const user = await userServices.getUserById(id);
      
      if (!user) throw new Error('User not found');
      return res.status(200).json({
        success: true,
        message: 'User',
        user,
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
      const {
        firstName, lastName, email, password, userRoleID, userAddressID
      } = req.body;
  
      const user = await userServices.getUserById(id);
      if (!user) throw new Error('User not found');
      if (!firstName && !lastName && !email && !password && !userRoleID && !userAddressID) throw new Error('Nothing to change');
  
      const userToUpdate: IUser = {
        id,
        firstName,
        lastName,
        email,
        password,
        userRoleID,
        userAddressID
      };
  
      const result = userServices.updateUser(userToUpdate);
      if (!result) throw new Error('Error, did not manage to update user');

      return res.status(200).json({
        success: true,
        message: 'User updated',
      });
      } catch (error) {
        next(error);
      }
};

const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
          firstName, lastName, personalNumber, email, password
        } = req.body;
        const newUser: IUser = {
          firstName,
          lastName,
          personalNumber,
          email,
          password,
        };
        const id = await userServices.createUser(newUser);
        if (!id) throw new Error('Error, did manage to create user');
        return res.status(201).json({
          success: true,
          message: `User with id ${id} created`,
        });
      } catch (error) {
        next(error);
      }
};

//TODO consider adding a row deleted=truse/false (default false) to Users table
// const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = parseInt(req.params.id, 10);
//         const user = await userServices.getUserById(id);
//         if (!user) {
//           return res.status(404).json({
//             success: false,
//             message: 'User not found',
//           });
//         };
      
//         const result = await userServices.deleteUser(id);
//         if (!result) throw new Error('Error, did not manage to delete user');
//         return res.status(200).json({
//           success: true,
//           message: 'User deleted',
//         });
//       } catch (error) {
//         next(error);
//       }
// };

const usersControllers = {
    getAllUsers,
    getUserById,
    updateUser,
    createNewUser,
}


export default usersControllers;