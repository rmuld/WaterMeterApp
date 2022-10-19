import { Request, Response } from 'express';
import { IAddress } from '../interfaces/addressesInterfaces';
import { addresses } from '../mockData/mockData';
import addressServices from '../services/addressServices';

const getAllAddresses = (req: Request, res: Response) => {  
    const addresses = addressServices.getAllAddresses();
    res.status(200).json({
        success: true,
        message: 'List of addresses',
        addresses,
    });
}

const getAddressById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let address: IAddress | undefined = addressServices.findAddressById(id);
    if (!address) {
        return res.status(404).json({
            success: false,
            message: `Address not found`,
        });
    }

    return res.status(200).json({
        success: true,
        message: `Address`,
        data: {
            address: address
        },
    });
};

const updateAddress = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { postalCode, houseNumber, streetName, county, municipality, apartmentNumber } = req.body;
    const address: IAddress | undefined = addressServices.findAddressById(id);
    if (!address) {
        return res.status(404).json({
            success: false,
            message: `Address not found`,
        });
    }
    if (!postalCode && !houseNumber && !streetName && !county && !municipality && !apartmentNumber) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (postalCode) address.postalCode = postalCode;
    if (houseNumber) address.houseNumber = houseNumber;
    if (streetName) address.streetName = streetName;
    if (county) address.county = county;
    if (municipality) address.municipality = municipality;
    if (apartmentNumber) address.apartmentNumber = apartmentNumber;

    return res.status(200).json({
        success: true,
        message: `Address updated`,
    });
};

const createNewAddress = (req: Request, res: Response) => {
    const { postalCode, houseNumber, streetName, county, municipality, apartmentNumber } = req.body;
    
    const newAddress = {
        postalCode,
        houseNumber,
        streetName,
        county,
        municipality,
        apartmentNumber
    }
    const id = addressServices.createAddress(newAddress);

    return res.status(201).json({
        success: true,
        message: `Address with id ${id} created`,
    });
};

const deleteAddressById = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = addresses.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Address not found`,
        });
    }
    addresses.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Address deleted`,
    });
};

const addressesControllers = {
    getAllAddresses,
    getAddressById,
    updateAddress,
    createNewAddress,
    deleteAddressById
}


export default addressesControllers;