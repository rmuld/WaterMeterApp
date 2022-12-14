import { NextFunction, Request, Response } from 'express';
import waterUsageServices from '../services/waterUsageServices';

const getAllWaterUsages = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let waterusages;
        waterusages = await waterUsageServices.getAllWaterUsages();

        res.status(200).json({
            success: true,
            message: 'List of water usages',
            waterusages,
        });
    } catch (error) {
        next(error);
    }
   
}

const getWaterUsageByWaterMeterId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const waterusage = await waterUsageServices.getWaterUsageByWaterMeterId(id);
        if (!waterusage) throw new Error('Watermeter usage not found');
        
        return res.status(200).json({
            success: true,
            message: `Watermeter usage`,
            waterusage,
        });
    } catch (error) {
        next(error);
    }   
};

const createNewWaterUsage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, consumptionTime, waterMeterID } = req.body;
        const newWaterUsage = {
            amount,
            consumptionTime,
            waterMeterID,
        }
        const id = waterUsageServices.createWaterUsage(newWaterUsage);
        if (!id) throw new Error('Error, did not manage to create water usage');

        return res.status(201).json({
            success: true,
            message: `Water usage with amount ${amount} created`,
        });
    } catch (error) {
        next(error);
    }   
};



const waterUsageControllers = {
    getAllWaterUsages,
    getWaterUsageByWaterMeterId,
    createNewWaterUsage,
}


export default waterUsageControllers;