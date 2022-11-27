import { Request, Response, NextFunction } from "express";

const addressesMiddlewares = {
    checkCreateAddressData: (req: Request, res: Response, next: NextFunction) => {
        const { postalCode, houseNumber, streetName, municipality, county, country  } = req.body;
        
        if (!postalCode || !houseNumber || !streetName || !municipality || !county || !country) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (postalCode, houseNumber, streetName, municipality, county, country)`,
            });
        };
        next();
    }
};

export default addressesMiddlewares;