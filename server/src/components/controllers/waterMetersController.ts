import { NextFunction, Request, Response } from 'express';
import waterMeterServices from '../services/waterMeterServices';

const getAllWaterMeters = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let watermeters;
        watermeters = await waterMeterServices.getAllWaterMeters();

        res.status(200).json({
            success: true,
            message: 'List of watermeters',
            watermeters,
        });
    } catch (error) {
        next(error);
    }
   
}

const getWaterMeterById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const watermeter = waterMeterServices.getWaterMeterById(id);
        if (!watermeter) throw new Error('Watermeter not found');
        
        return res.status(200).json({
            success: true,
            message: `Watermeter`,
            data: {
                watermeter
            },
        });
    } catch (error) {
        next(error);
    }   
};

const createNewWaterMeter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { serialNumber, checkingDate, sealNumber, type, addressId } = req.body;
        const newWaterMeter = {
            serialNumber,
            checkingDate,
            sealNumber,
            type,
            addressId,
        }
        const id = waterMeterServices.createWaterMeter(newWaterMeter);
        if (!id) throw new Error('Error, did manage to create watermeter');

        return res.status(201).json({
            success: true,
            message: `Watermeter with id ${id} created`,
        });
    } catch (error) {
        next(error);
    }   
};

const deleteWaterMeterById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const watermeter = await waterMeterServices.getWaterMeterById(id);
        if (!watermeter) throw new Error('Watermeter not found');
        const result = await waterMeterServices.deleteWaterMeter(id);
        if (!result) throw new Error('Error, did manage to delete watermeter');
        return res.status(200).json({
            success: true,
            message: `Watermeter deleted`,
        });
    } catch (error) {
        next(error);
    }
};

const waterMetersControllers = {
    getAllWaterMeters,
    getWaterMeterById,
    createNewWaterMeter,
    deleteWaterMeterById
}


export default waterMetersControllers;