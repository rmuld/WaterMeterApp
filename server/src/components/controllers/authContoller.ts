import { Request, Response } from "express";
import authServices from "../services/authServices";
import userServices from "../services/userServices";


const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (email, password)`
            });
        };
        const user = await userServices.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`
            })
        }
        const match = await authServices.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: `Wrong password`
            })
        }
        const token = await authServices.sign(user);
        return res.status(200).json({
            success: true,
            message: `Token`,
            token
        });
    }
};

export default authController;