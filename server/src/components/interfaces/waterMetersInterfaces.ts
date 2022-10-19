interface INewWaterMeter {
    serialNumber: string;
    checkingDate: string;
    sealNumber: string;
    type: string;
    addressId: number;
}

interface IWaterMeter extends INewWaterMeter {
    id: number;
}


export { IWaterMeter, INewWaterMeter };