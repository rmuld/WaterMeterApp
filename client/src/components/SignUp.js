import React, { useState } from "react";


const Signup = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();

    function registerNewUser() {
        
    }

return (
    <div>
        <h3>Kasutajaks registreerimine</h3>
        <div>
            <label htmlFor='firstName'>Eesnimi: </label>
            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <br />
            <label htmlFor='lastName'>Perekonnanimi: </label>
            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <br />
            <label htmlFor="email">E-post: </label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <br />
            <label htmlFor="phone">Telefon: </label>
            <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
            <br/>
            <label htmlFor="password">Parool: </label>
            <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <br/>
            <label htmlFor="passwordRepeat">Korda parooli: </label>
            <input type="text" id="passwordRepeat" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)}></input>
            <br/>
            <input type="button" value="Salvesta" onClick={() => registerNewUser()} />
        </div>
    </div>
    )
}

export default Signup;