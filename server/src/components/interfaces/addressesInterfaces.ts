interface INewAddress  {
    postalCode: number;
    houseNumber: number;
    streetName: string;
    county: string;
    municipality: string;
    apartmentNumber?: number;
}

interface IAddress extends INewAddress {
    id: number;
}

export { INewAddress, IAddress };