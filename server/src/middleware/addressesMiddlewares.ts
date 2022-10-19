import { Request, Response, NextFunction } from "express";

const addressesMiddlewares = {
    checkCreateAddressData: (req: Request, res: Response, next: NextFunction) => {
        const { postalCode, houseNumber, streetName, county, municipality, apartmentNumber } = req.body;
        if (!postalCode || !houseNumber || !streetName || !county || !municipality || !apartmentNumber) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (postalCode, houseNumber, streetName, county, municipality, apartmentNumber)`,
            });
        };
        next();
    }
};

export default addressesMiddlewares;