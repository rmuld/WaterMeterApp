import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {AuthContext} from '../../shared/context/AuthContext'

const LoginContainer = styled('div')`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 250px;      
`;

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}
 
const Login = () => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
 
    console.log('email: ', email)
    console.log('passw: ', password)

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/api/v1/login', {email, password})
            .then(res => {
                const token = res.data.token;

                
                localStorage.setItem('token', token);

                setAuthToken(token);

                navigate('/waterusage')
            })
            .catch(err => console.log(err));
    }
      
return (
    <div>
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
                <button type="submit">Logi sisse</button>
                <br/>
            </form>
            <br/>
        <Link to="/register">Registreeri kasutajaks</Link>
        </LoginContainer>
        
    </div>
    )
}

export default Login;