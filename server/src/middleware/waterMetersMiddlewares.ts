import { Request, Response, NextFunction } from "express";

const waterMetersMiddlewares = {
    checkCreateWaterMeterData: (req: Request, res: Response, next: NextFunction) => {
        const { serialNumber, checkingDate, sealNumber, wmAddressID, wmTypeID } = req.body;
        if (!serialNumber || !checkingDate || !sealNumber || !wmAddressID || !wmTypeID) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (serialNumber, checkingDate, sealNumber, type, address )`,
            });
        };
        next();
    }
};

export default waterMetersMiddlewares;