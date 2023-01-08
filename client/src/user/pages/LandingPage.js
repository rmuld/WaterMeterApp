import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled("div")`
width: auto;
margin: 80px auto;
text-align: center;
align
& h1 {
    margin-bottom: 30px;
}
`;


const LandingPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const getUserById = async () => {
        await axios.get("http://localhost:3000/api/v1/users/1")
            .then((res) => {
                let response = res.data.user;
                console.log('User: ', response)
                return response;
            })
            .then((response) => {
                const firstName = response.firstName;
                const lastName = response.lastName;

                setFirstName(firstName);
                setLastName(lastName);
            })
    };

    useEffect(() => {
        getUserById();
    }, []);


    
    return (
        <PageContainer>
            <h1>Avaleht sisse logides</h1>
            {!firstName && !lastName && <div>
                Tere, Anonüümne, kuidas sa siia said?
            </div>}
            {firstName && lastName && <div>
                Tere, {firstName} {lastName}
            </div>}
            
        </PageContainer>
    )
}

export default LandingPage;