import { NextFunction, Request, Response } from 'express';
import { IAddress } from '../interfaces/addressesInterfaces';
import { addresses } from '../mockData/mockData';
import addressServices from '../services/addressServices';

const getAllAddresses = (req: Request, res: Response, next: NextFunction) => {
    try {
        let addresses;
        const { id } = res.locals.address;
        addresses = addressServices.getAllAddresses();

        res.status(200).json({
            success: true,
            message: 'List of addresses',
            addresses,
        });
    } catch (error) {
        next(error);
    }   
}

const getAddressById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const address = await addressServices.findAddressById(id);
        if (!address) throw new Error('Address not found');

        return res.status(200).json({
            success: true,
            message: `Address`,
            data: {
                address: address
            },
        });
    } catch (error) {
        next(error);
    }   
};

const createNewAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postalCode, houseNumber, streetName, county, municipality, apartmentNumber, country } = req.body;
        const newAddress = {
            postalCode,
            houseNumber,
            streetName,
            county,
            municipality,
            apartmentNumber,
            country,
        }
        const id = await addressServices.createAddress(newAddress);
        if (!id) throw new Error('Error, did manage to create address')
        return res.status(201).json({
            success: true,
            message: `Address with id ${id} created`,
        });
    } catch (error) {
        next(error);
    }   
};

const deleteAddressById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const address = await addressServices.findAddressById(id);
        if (!address) throw new Error('Error, did manage to delete address');
        return res.status(200).json({
            success: true,
            message: `Address deleted`,
        });
    } catch (error) {
        next(error);
    }   
};

const addressesControllers = {
    getAllAddresses,
    getAddressById,
    createNewAddress,
    deleteAddressById,
}


export default addressesControllers;