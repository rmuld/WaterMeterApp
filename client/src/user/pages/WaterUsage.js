import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const WaterUsageContainer = styled("div")`
width: 10.5em;
margin: 0 auto;
`;

const WaterUsage = () => {
    const [waterUsage, setWaterUsage] = useState();

    const getAllWaterUsages = () => {
        axios.get("http://localhost:3000/api/v1/water-usage")
            .then((res) => {
                let response = res.data.waterusages;
                console.log("RES: ", response)
                return response;
            })
            .then((response) => {
                setWaterUsage(response);
            })
    };

    // useEffect(() => {
    //     getAllWaterUsages();
    // }, []);

    return (
        <WaterUsageContainer>
            Water usage
        </WaterUsageContainer>
    )
}

export default WaterUsage;