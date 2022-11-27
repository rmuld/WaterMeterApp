import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import { IWaterMeterSQL, IWaterMeter } from '../interfaces/waterMetersInterfaces';


const getAllWaterMeters =async () => {
    const [wm] = await pool.query('SELECT * FROM WaterMeters;');
    return wm;
}

const getWaterMeterById = async(id: number) => {
    const [wm]: [IWaterMeterSQL[], FieldPacket[]] = await pool.query(`SELECT id, serialNumber, checkingDate, sealNumber, wmAddressID, wmTypeID, creationTime FROM WaterMeters WHERE id=?;`, [id]);
    return wm[0];
};

const createWaterMeter = async (waterMeter: IWaterMeter): Promise<number> => {
    const newWaterMeter = {
        serialNumber: waterMeter.serialNumber,
        checkingDate: waterMeter.checkingDate,
        sealNumber: waterMeter.sealNumber,
        wmAddressId: waterMeter.wmAddressID,
        wmTypeID: 1,
    };
    
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO WaterMeters SET ?;', [newWaterMeter]);

    return result.insertId;
}


// const deleteWaterMeter = async (id: number): Promise<boolean> => {
//     const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(`UPDATE WaterMeters SET deletedDate=? WHERE id=?;`, [new Date(), id]);
//     if (result.affectedRows < 1) {
//         return false;
//     }
//     return true;
// }

const addressServices = {
    getAllWaterMeters,
    getWaterMeterById,
    createWaterMeter,
}

export default addressServices;