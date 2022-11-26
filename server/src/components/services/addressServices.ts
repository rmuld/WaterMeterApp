import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import { IAddressSQL, IAddress } from '../interfaces/addressesInterfaces';


const getAllAddresses = async () => {
    const [a] = await pool.query('select * from Addresses;');
    return a;
}

const findAddressById = async (id: number) => {
    const [address]: [IAddressSQL[], FieldPacket[]] = await pool.query(`SELECT postalCode, houseNumber, apartmentNumber, streetName, municipality, county, country FROM Addresses WHERE id=?;`, [id]);
    return address[0];
};


    
const createAddress = async (address: IAddress):Promise<number | boolean> => {
    const newAddress: IAddress = {
        postalCode: address.postalCode,
        houseNumber: address.houseNumber,
        apartmentNumber: address.apartmentNumber,
        streetName: address.streetName,
        municipality: address.municipality,
        county: address.county,
        country: address.country,
    };
    
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(`INSERT INTO Addresses SET ?`, [newAddress]);
    //return false;
    return result.insertId;
}

const addressServices = {
    getAllAddresses,
    findAddressById,
    createAddress,
}

export default addressServices;