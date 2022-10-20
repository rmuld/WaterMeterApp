import React, { useState } from "react";
import { initialWaterMeterList } from "../mockData";


const AddNewWaterMeter = () => {
    const [waterMeterList, setWaterMeterList] = useState(initialWaterMeterList);
    const [serialNumber, setSerialNumber] = useState();
    const [checkingDate, setCheckingDate] = useState();
    const [sealNumber, setSealNumber] = useState();
    const [type, setType] = useState();

    function addWaterMeter() {
        let available = true;
        for (let i=0; i < waterMeterList.length; i++){
            if (waterMeterList[i].serialNumber === serialNumber) { available = false;  alert("Seerianumber juba olemas")}
        }
        if(available){setWaterMeterList(waterMeterList.concat({serialNumber:serialNumber,  checkingDate: checkingDate}))}
         
    }

    function deleteWaterMeter(watermeterToDelete) {
        if (window.confirm(`Kas soovid kustutada veemõõtjat ${watermeterToDelete}?`)) {
            setWaterMeterList(waterMeterList.filter((k1) => watermeterToDelete!==k1.serialNumber))
        }
    }

return (
    <div>
        <h3>Andmete lisamine</h3>
        <div>
            <h4>Lisa veemõõtja</h4>
            <label htmlFor='serialNumber'>Seerianumber: </label>
            <input type="text" id="serialNumber" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            <br />
            <label htmlFor='checkingDate'>Kontrollimise kuupäev: </label>
            <input type="text" id="checkingDate" value={checkingDate} onChange={(e) => setCheckingDate(e.target.value)} />
            <br />
            <label htmlFor="sealNumber">Plommi number: </label>
            <input type="text" id="sealNumber" value={sealNumber} onChange={(e) => setSealNumber(e.target.value)}></input>
            <br />
            <label htmlFor="waterMeterType">Veemõõtja tüüp: </label>
            <input type="text" id="waterMeterType" value={type} onChange={(e) => setType(e.target.value)}></input>
            <br/>
            <input type="button" value="Lisa" onClick={() => addWaterMeter()} />
        </div>
        <div>
            <p>Kustuta veemõõtja</p>
            <ul>
                {
                    waterMeterList.map((item) =>
                        <li key={item.serialNumber}>Veemõõtja seerianumbriga: {item.serialNumber}
                            <button onClick={() => deleteWaterMeter(item.serialNumber)}>Kustuta</button>
                        </li>
                    )
                }
            </ul>
        </div>
    </div>
    )
}

export default AddNewWaterMeter;
