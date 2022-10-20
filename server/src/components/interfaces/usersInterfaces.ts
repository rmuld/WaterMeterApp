interface INewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalNumber: number;
    phone: string;
    role: string;
}

interface IUserWithoutRole {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    personalNumber: number;
    phone: string;
}

interface IUser extends INewUser {
    id: number;
}

interface IUserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    personalNumber: number;
    phone: string;
    role: string;
}

export { INewUser, IUser, IUserWithoutPassword, IUserWithoutRole };