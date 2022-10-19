import { Request, Response } from 'express';
import { IWaterMeter } from '../interfaces/waterMetersInterfaces';
import { waterMeters } from '../mockData/mockData';
import waterMeterServices from '../services/waterMeterServices';

const getAllWaterMeters = (req: Request, res: Response) => {  
    res.status(200).json({
        success: true,
        message: 'List of watermeters',
        waterMeters,
    });
}

const getWaterMeterById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let waterMeter: IWaterMeter | undefined = waterMeterServices.findWaterMeterById(id);
    if (!waterMeter) {
        return res.status(404).json({
            success: false,
            message: `Watermeter not found`,
        });
    }

    return res.status(200).json({
        success: true,
        message: `Watermeter`,
        data: {
            address: waterMeter
        },
    });
};

const updateWaterMeter = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { serialNumber, checkingDate, sealNumber, type } = req.body;
    const waterMeter: IWaterMeter | undefined = waterMeterServices.findWaterMeterById(id);
    if (!waterMeter) {
        return res.status(404).json({
            success: false,
            message: `Watermeter not found`,
        });
    }
    if (!serialNumber && !checkingDate && !sealNumber && !type) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (serialNumber) waterMeter.serialNumber = serialNumber;
    if (checkingDate) waterMeter.checkingDate = checkingDate;
    if (sealNumber) waterMeter.sealNumber = sealNumber;
    if (type) waterMeter.type = type;

    return res.status(200).json({
        success: true,
        message: `Watermeter updated`,
    });
};

const createNewWaterMeter = (req: Request, res: Response) => {
    const {  serialNumber, checkingDate, sealNumber, type, addressId } = req.body;
    
    const newWaterMeter = {
        serialNumber,
        checkingDate,
        sealNumber,
        type,
        addressId
    }
    const id = waterMeterServices.createWaterMeterService(newWaterMeter);

    return res.status(201).json({
        success: true,
        message: `Watermeter with id ${id} created`,
    });
};

const deleteWaterMeterById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = waterMeters.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Watermeter not found`,
        });
    }
    waterMeters.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Watermeter deleted`,
    });
};

const waterMetersControllers = {
    getAllWaterMeters,
    getWaterMeterById,
    updateWaterMeter,
    createNewWaterMeter,
    deleteWaterMeterById
}


export default waterMetersControllers;