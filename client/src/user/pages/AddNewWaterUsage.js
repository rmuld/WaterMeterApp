import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components';

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

const AddNewWaterUsage = () => {
    const [waterUsageList, setWaterUsageList] = useState([]);
    const [amount, setAmount] = useState('');
    const [consumptionTime, setConsumptionTime] = useState('');
    
    const waterMeterID = 2;
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await axios.post('http://localhost:3000/api/v1/water-usage', {amount, consumptionTime, waterMeterID })
            .then(res => {
                setAmount('');
                setConsumptionTime('');
                alert('Lisatud!')
            })
            .catch(err => {
                alert('Midagi läks valesti!')
                console.log(err)
            });
        
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
            setWaterUsageList(waterUsageList.filter((k1) => watermeterToDelete!==k1.waterMeterId))
        }
    }

return (
    <PageContainer>
        <h1>Andmete lisamine</h1>
        <div>
            <h4>Lisa vee tarbimine</h4>
            <form action="#" onSubmit={handleSubmit}>
            <label htmlFor='amount'>Veemõõtja näit</label>
            <br/>
            <input type="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <br />
            <br />
            <label htmlFor="consumptionTime">Tarbimise aeg (YYYY-MM)</label>
            <br/>
            <input type="text" id="consumptionTime" value={consumptionTime} onChange={(e) => setConsumptionTime(e.target.value)}></input>
            <br />            
            <br />            
            <StyledButton type="submit">Lisa</StyledButton>
                <br/>
            </form>
        </div>
        {waterUsageList && <div>
            {/* <p>Kustuta veemõõtja</p> */}
            <ul>
                {
                    waterUsageList.map((item) =>
                        <li key={item.waterMeterId}>Veemõõtja ID-gs: {item.waterMeterId}
                            <button onClick={() => deleteWaterMeter(item.waterMeterId)}>Kustuta</button>
                        </li>
                    )
                }
            </ul>
        </div>}
    </PageContainer>
    )
}

export default AddNewWaterUsage;
