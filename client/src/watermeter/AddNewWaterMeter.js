import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components';
//import { initialWaterMeterList } from "../mockData";

const PageContainer = styled("div")`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 80px; 
& h1 {
    margin-bottom: 30px;
    text-align: left;
}
`;

const StyledButton = styled('button')`
background-color: #7D9FBF;
border: 1px solid #7D9FBF;
`;

const AddNewWaterMeter = () => {
    //const [waterMeterList, setWaterMeterList] = useState(initialWaterMeterList);
    const [waterMeterList, setWaterMeterList] = useState([]);
    const [serialNumber, setSerialNumber] = useState('');
    const [checkingDate, setCheckingDate] = useState('');
    const [sealNumber, setSealNumber] = useState('');
    const [wmAddressID, setWmAddressID] = useState('');
    const wmTypeID = 1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/api/v1/water-meter', {serialNumber, checkingDate, sealNumber, wmAddressID, wmTypeID })
            .then(res => {
                setSerialNumber('');
                setCheckingDate('');
                setSealNumber('');
                setWmAddressID('');
                alert('Lisatud!')
            })
            .catch(err => console.log(err));
        
    }

    // function addWaterMeter() {
    //     let available = true;
    //     for (let i=0; i < waterMeterList.length; i++){
    //         if (waterMeterList[i].serialNumber === serialNumber) { available = false;  alert("Seerianumber juba olemas")}
    //     }
    //     if(available){setWaterMeterList(waterMeterList.concat({serialNumber:serialNumber,  checkingDate: checkingDate}))}
         
    // }

    function deleteWaterMeter(watermeterToDelete) {
        if (window.confirm(`Kas soovid kustutada veemõõtjat ${watermeterToDelete}?`)) {
            setWaterMeterList(waterMeterList.filter((k1) => watermeterToDelete!==k1.serialNumber))
        }
    }

return (
    <PageContainer>
        <h1>Andmete lisamine</h1>
        <div>
            <h4>Lisa veemõõtja</h4>
            <form action="#" onSubmit={handleSubmit}>
            <label htmlFor='serialNumber'>Seerianumber</label>
            <br/>
            <input type="text" id="serialNumber" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            <br />
            <label htmlFor='checkingDate'>Kontrollimise kuupäev</label>
            <br/>
            <input type="text" id="checkingDate" value={checkingDate} onChange={(e) => setCheckingDate(e.target.value)} />
            <br />
            <label htmlFor="sealNumber">Plommi number</label>
            <br/>
            <input type="text" id="sealNumber" value={sealNumber} onChange={(e) => setSealNumber(e.target.value)}></input>
            <br />
            <label htmlFor="wmAddressID">Veemõõtja aadress (ID)</label>
            <br/>
            <input type="text" id="wmAddressID" value={wmAddressID} onChange={(e) => setWmAddressID(e.target.value)}></input>
            <br />
            <StyledButton type="submit">Lisa</StyledButton>
                <br/>
            </form>
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
    </PageContainer>
    )
}

export default AddNewWaterMeter;
