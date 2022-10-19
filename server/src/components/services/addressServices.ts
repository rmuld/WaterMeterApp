import { INewAddress, IAddress } from '../interfaces/addressesInterfaces';
import { IWaterMeter } from '../interfaces/waterMetersInterfaces';
import { addresses, waterMeters } from '../mockData/mockData';
import waterMeterServices from './waterMeterServices';


const getAllAddresses = () => {
    return addresses
}

const findAddressById = (id: number): IAddress | undefined => {
    let address: IAddress | undefined = addresses.find(element => element.id === id);
    return address;
};


    
const createAddress = (address: INewAddress):number => {
    const id = addresses.length + 1;
    const newAddress: IAddress = {
        id,
        postalCode: address.postalCode,
        houseNumber: address.houseNumber,
        streetName: address.streetName,
        county: address.county,
        municipality: address.municipality,
        apartmentNumber: address.apartmentNumber,
    };
    addresses.push(newAddress);
    return id;
}

// const getAddressWithWatermeters = (address: IAddress)  => {
//     const addressWaterMeters = addressWaterMetesServices.getAddressWaterMetersById(address.);
// }
const addressServices = {
    getAllAddresses,
    //getAddressWithWatermeters,
    findAddressById,
    createAddress
}

export default addressServices;