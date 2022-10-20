import React, { useState } from "react";
import { initialAddressesList } from "../mockData";

const AddNewAddress = () => {
    const [addressList, setAddressList] = useState(initialAddressesList);
    const [postalCode, setPostalCodet] = useState();
    const [apartmentNumber, setApartmentNumber] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [streetName, setStreetName] = useState();
    const [municipality, setMunicipality] = useState();
    const [county, setCounty] = useState();
    const [id, setId] = useState();
    

    function regiterNewAddress() {
        let available = true;
        const addressId = addressList.length + 1;
        for (let i=0; i < addressList.length; i++){
            if (addressList[i].id === id) { available = false;  alert("Aadress on juba olemas")}
        }
        if (available) {
            setAddressList(addressList.concat(
                {
                    id: addressId,
                    postalCode: postalCode,
                    apartmentNumber: apartmentNumber,
                    houseNumber: houseNumber,
                    streetName: streetName,
                    municipality: municipality,
                    county: county
                }))
        }
         
    }

    function deleteAddress(addressToDelete) {
        if (window.confirm(`Kas soovid kustutada aadressi id-ga ${addressToDelete} loetelust?`)) {
            setAddressList(addressList.filter((k1) => addressToDelete!==k1.id))
        }
    }

return (
    <div>
        <h3>Aadressi lisamine</h3>
        <div>
            <label htmlFor='postalCode'>Postiindeks: </label>
            <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCodet.value} />
            <br />
            <label htmlFor='apartmentNumber'>Korteri number: </label>
            <input type="text" id="apartmentNumber" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} />
            <br />
            <label htmlFor='houseNumber'>Maja number: </label>
            <input type="text" id="houseNumber" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />
            <br />
            <label htmlFor="streetName">Tänav: </label>
            <input type="text" id="streetName" value={streetName} onChange={(e) => setStreetName(e.target.value)}></input>
            <br />
            <label htmlFor="municipality">Linn/vald: </label>
            <input type="text" id="municipality" value={municipality} onChange={(e) => setMunicipality(e.target.value)}></input>
            <br/>
            <label htmlFor="county">Maakond: </label>
            <input type="text" id="county" value={county} onChange={(e) => setCounty(e.target.value)}></input>
            <br/>
            <input type="button" value="Salvesta" onClick={() => regiterNewAddress()} />
        </div>
        <p>Kustuta aadress</p>
        <div>
            <ul>
                {
                    addressList.map((item) =>
                        <li key={item.id}>Aadress: {item.streetName}, {item.houseNumber}, {item.municipality}
                            <button onClick={() => deleteAddress(item.id)}>Kustuta</button>
                        </li>
                    )
                }
            </ul>
        </div>
    </div>
    )
}

export default AddNewAddress;