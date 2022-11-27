import { NextFunction, Request, Response } from 'express';
import addressServices from '../services/addressServices';

const getAllAddresses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let addresses;
        addresses = await addressServices.getAllAddresses();
        
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
        const { postalCode, houseNumber, apartmentNumber, streetName, municipality, county, country } = req.body;
        const newAddress = {
            postalCode,
            houseNumber,
            apartmentNumber,
            streetName,
            municipality,
            county,
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

//TODO consider adding a row deleted=truse/false (default false) to Addresses table
// const deleteAddressById = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = parseInt(req.params.id, 10);
//         const address = await addressServices.findAddressById(id);
//         if (!address) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Address not found',
//             })
//         };
//         const result = await addressServices.deleteAddress(id);
//         if (!result) throw new Error('Error, did not manage to delete address');
//         return res.status(200).json({
//             success: true,
//             message: `Address deleted`,
//         });
//     } catch (error) {
//         next(error);
//     }   
// };

const addressesControllers = {
    getAllAddresses,
    getAddressById,
    createNewAddress,
}


export default addressesControllers;