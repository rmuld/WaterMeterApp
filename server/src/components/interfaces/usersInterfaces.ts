import { RowDataPacket } from 'mysql2';

interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    personalNumber?: number;
    email: string;
    password: string;
    userRoleID?: number;
    userAddressID?: string;
}

interface IUserSQL extends IUser, RowDataPacket {}

export { IUser, IUserSQL };