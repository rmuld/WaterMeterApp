import { Request, Response, NextFunction } from "express";

const waterMetersMiddlewares = {
    checkCreateWaterMeterData: (req: Request, res: Response, next: NextFunction) => {
        const { serialNumber, checkingDate, sealNumber, type } = req.body;
        if (!serialNumber || !checkingDate || !sealNumber || !type) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (serialNumber, checkingDate, sealNumber, type )`,
            });
        };
        next();
    }
};

export default waterMetersMiddlewares;