import { RowDataPacket } from 'mysql2';

interface IWaterMeter {
    id?: number;
    serialNumber: string;
    checkingDate: string;
    sealNumber: string;
    wmTypeID: string;
    wmAddressID: number;
}

interface IWaterMeterSQL extends IWaterMeter, RowDataPacket {}

export { IWaterMeter, IWaterMeterSQL };