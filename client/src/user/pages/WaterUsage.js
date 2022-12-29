import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Table from 'react-bootstrap/Table';

const WaterUsageContainer = styled("div")`
width: auto;
margin: 0 auto;
text-align: center;
align
& h1 {
    margin-bottom: 30px;
}
`;

const TableContainer = styled('div')`
max-width: 600px;
margin: auto;
`;

const WaterUsage = () => {
    const [waterUsage, setWaterUsage] = useState([]);
    const [years, setYears] = useState(["---", "2021", "2022"]);
    const [months, setMonths] = useState(["---", "jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"]);
    const [yearSelected, setYearSelected] = useState("---");
    const [monthSelected, setMonthSelected] = useState("---");

    const getAllWaterUsages = () => {
        axios.get("http://localhost:3000/api/v1/water-usage")
            .then((res) => {
                let response = res.data.waterusages;
                return response;
            })
            .then((response) => {
                response.forEach(
                    (val, i) => {
                        val["consumptionYear"] = getYear(val.consumptionTime);
                        val["consumptionMonth"] = getMonth(val.consumptionTime);
                    });
                setWaterUsage(response);
            })
    };

    useEffect(() => {
        getAllWaterUsages();
    }, []);

    const getYear = (utcDate) => {
        let d = new Date(utcDate);
        let year = d.getFullYear();
        return year
    }
    
    const getMonth = (utcDate) => {
        let d = new Date(utcDate);
        let month = d.toLocaleString('default', { month: 'long' });
        return month;
    }
    
    const handleYearChange = (e) => {
        setYearSelected(e.target.value)
    }
    const handleMonthChange = (e) => {
        setMonthSelected(e.target.value)
    }

    let filteredTable = waterUsage;
    if (yearSelected !== "---" || monthSelected !== "---") {
        filteredTable = (yearSelected !== "---")
            ? waterUsage.filter(usage => usage.consumptionYear == yearSelected)
            : waterUsage.filter(usage => usage.consumptionMonth == monthSelected);
    }
    
    return (
        <WaterUsageContainer>
            <h1>Vee tarbimine</h1>
            <div>
                Year 
                <select onChange={e => handleYearChange(e)}>
                {years.map((val, i) =>
                    <option key={i} value={val}>{val}</option>
                )}
                </select>
        
                Month 
                <select onChange={e => handleMonthChange(e)}>
                {months.map((val, i) =>
                    <option key={i} value={val}>{val}</option>
                )}
                </select>
          </div>
            <TableContainer>
                <Table striped bordered hover size="sm">
                    <thead >
                        <tr>
                            <td>ID</td>
                            <td>watermeter ID</td>
                            <td>Amount</td>
                            <td>Year</td>
                            <td>Month</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTable.map((val) =>
                            <tr key={val.ID}>
                                <td value={val.ID} >{val.ID}</td>
                                <td value={val.waterMeterID} >{val.waterMeterID}</td>
                                <td value={val.amount} >{val.amount}</td>
                                <td value={val.consumptionYear}>{val.consumptionYear}</td>
                                <td value={val.consumptionMonth}>{val.consumptionMonth}</td>
                            </tr>
                            )}
                    </tbody>
                </Table>
            </TableContainer>
        </WaterUsageContainer>
    )
}

export default WaterUsage;