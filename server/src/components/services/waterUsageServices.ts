import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import { IWaterUsage, IWaterUsageSQL } from '../interfaces/waterUsageInterfaces';


const getAllWaterUsages = async () => {
    const [wu] = await pool.query('SELECT * FROM WaterUsage;');
    return wu;
}

const getWaterUsageByWaterMeterId = async(id: number) => {
    const [wm]: [IWaterUsageSQL[], FieldPacket[]] = await pool.query(`SELECT id, amount, consumptionTime FROM WaterUsage WHERE waterMeterID=?;`, [id]);
    return wm[0];
};

const createWaterUsage = async (waterUsage: IWaterUsage): Promise<number> => {
    const newWaterUsage = {
        amount: waterUsage.amount,
        waterMeterID: waterUsage.waterMeterID,
        consumptionTime: waterUsage.consumptionTime
    };
    
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO WaterUsage SET ?;', [newWaterUsage]);

    return result.insertId;
}


const addressServices = {
    getAllWaterUsages,
    getWaterUsageByWaterMeterId,
    createWaterUsage,
}

export default addressServices;