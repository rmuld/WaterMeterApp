import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const WaterUsageContainer = styled("div")`
width: 10.5em;
margin: 0 auto;
`;

const WaterUsage = () => {
    const [waterUsage, setWaterUsage] = useState();

    const getAllWaterUsages = () => {
        fetch("http://localhost:3000/api/v1/water-usage")
            .then((res) => {
                let response = res.json();
                console.log('all water usage: ', res)
                return response;
            })
            .then((data) => {
                setWaterUsage(data.waterUsage);
            })
    };

    useEffect(() => {
        getAllWaterUsages();
    }, []);

    return (
        <WaterUsageContainer>
            Water usage
        </WaterUsageContainer>
    )
}

export default WaterUsage;