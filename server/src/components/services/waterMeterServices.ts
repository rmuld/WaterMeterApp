import { INewAddress, IAddress } from '../interfaces/addressesInterfaces';
import { INewWaterMeter, IWaterMeter } from '../interfaces/waterMetersInterfaces';
import { waterMeters } from '../mockData/mockData';


const findWaterMeterById = (id: number): IWaterMeter | undefined => {
    let waterMeter: IWaterMeter | undefined = waterMeters.find(element => element.id === id);
    return waterMeter;
};


    
const createWaterMeterService = (waterMeter: INewWaterMeter):number => {
    const id = waterMeters.length + 1;
    const newWaterMeter: IWaterMeter = {
        id,
        serialNumber: waterMeter.serialNumber,
        checkingDate: waterMeter.checkingDate,
        sealNumber: waterMeter.sealNumber,
        type: waterMeter.type,
        addressId: waterMeter.addressId
    };
    waterMeters.push(newWaterMeter);
    return id;
}

const findWaterMeterByAddressId = (id: number): IWaterMeter[] => {
    const addressWaterMeters = waterMeters.filter(waterMeter => waterMeter.addressId === id);
    return addressWaterMeters;
}

const addressServices = {
    findWaterMeterById,
    findWaterMeterByAddressId,
    createWaterMeterService
}

export default addressServices;