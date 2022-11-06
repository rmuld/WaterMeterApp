import { Request, Response, NextFunction } from "express";

const waterUsageMiddlewares = {
    checkCreateWaterUsageData: (req: Request, res: Response, next: NextFunction) => {
        const { amount, consumptionTime, waterMeterID } = req.body;
        if (!amount || !consumptionTime || !waterMeterID) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (amount, consumptionTime, waterMeterID )`,
            });
        };
        next();
    }
};

export default waterUsageMiddlewares;