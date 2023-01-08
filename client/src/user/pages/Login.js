import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {AuthContext} from '../../shared/context/AuthContext'

const LoginContainer = styled('div')`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 250px;      
`;

const StyledButton = styled('button')`
background-color: #7D9FBF;
border: 1px solid #7D9FBF;
`;

const StyledLink = styled(Link)`
color: #517DA5;
margin-left: -42px;
`;

const Login = () => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/api/v1/login', {email, password})
            .then(res => {
                const token = res.data.token;
                authContext.login(token);
                
            })
            .catch(err => console.log(err));
    }
      
return (
    <>
        <LoginContainer>
            <h1>Logi sisse</h1>
            <form action="#" onSubmit={handleSubmit}>
                <label htmlFor="email">Kasutajanimi</label>
                <br/>
                <input type="text" id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        aria-label="email"
                        required
                        onChange={e => setEmail(e.target.value)}
                    />
                <br/>
                <label htmlFor="password"> Parool</label>
                <br/>
                <input name="password"
                    type="password"
                    id="password"
                    aria-label="Password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />
                
                <br />
                <br/>
                <StyledButton type="submit">Logi sisse</StyledButton>
                <br/>
            </form>
            <br/>
        <StyledLink to="/register">Registreeri kasutajaks</StyledLink>
        </LoginContainer>
        
    </>
    )
}

export default Login;