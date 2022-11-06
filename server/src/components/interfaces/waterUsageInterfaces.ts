import { RowDataPacket } from 'mysql2';

interface IWaterUsage {
    id?: number;
    amount: number;
    waterMeterID: number;
    consumptionTime: string;
}

interface IWaterUsageSQL extends IWaterUsage, RowDataPacket {}

export { IWaterUsage, IWaterUsageSQL };