import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import {IUser, IUserSQL } from "../interfaces/usersInterfaces";
import authServices from './authServices';

const getUserById = async (id: number) => {
    const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT id, firstName, lastName, personalNumber, email, creationTime, userRoleID, useraddressID FROM Users WHERE id=?;`, [id]);
    return user[0];
};

const getUserByEmail = async (email: string) => {
    const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT id, email, password, userRoleID FROM Users WHERE email=?;`, [email]);
    return user[0];
};

const getAllUsers = async () => {
    const [u] = await pool.query('select * from Users;');
    return u;
};
    
const createUser = async (user: IUser): Promise<number | boolean> => {
    const hashedPassword = await authServices.hash(user.password)
    const newUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        personalNumber: user.personalNumber,
        email: user.email,
        password: hashedPassword,
        userRoleID: 3,
        userAddressID: 1000
    }

    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(`INSERT INTO Users SET ?;`, [newUser]);
    return result.insertId;
}


const updateUser = async (userToUpdate: IUser): Promise<Boolean> => {
    const { id, firstName, lastName, personalNumber, email, password } = userToUpdate;
    const user = await userServices.getUserById(id!);
    let hashedPassword = null;
    if (password) { hashedPassword = await authServices.hash(password) }
    
    const update = {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        email: email || user.email,
        password: hashedPassword || user.password,
    }

    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(`UPDATE users SET ? WHERE id=?;`, [update, id]);
    if (result.affectedRows < 1) {
        return false;
    }
    return true;
}

// const deleteUser = async (id: number): Promise<Boolean> => {
//     const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(`DELETE FROM Users WHERE id=?;`, [id]);
//     if (result.affectedRows < 1) {
//         return false;
//     }
//     return true;
// }

//TODO
//updateUserRole
//updateUserAddress


const userServices = {
    getAllUsers,
    getUserById,
    getUserByEmail, 
    createUser,
    updateUser,    
}

export default userServices;