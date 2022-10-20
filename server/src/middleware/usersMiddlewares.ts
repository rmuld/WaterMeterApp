import { Request, Response, NextFunction } from "express";


const checkCreateUserData = (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, personalNumber, phone } = req.body;
    if (!firstName || !lastName || !email || !password || !personalNumber || !phone) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (firstName, lastName, email, password, personalNumber, phone)`,
        });
    };
    return next();
}

const usersMiddlewares = {
    checkCreateUserData
};

export default usersMiddlewares;