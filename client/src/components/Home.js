import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
        <h1>Avaleht</h1>
        <br />
        <ul>
            <li>
            <Link to="/waterusage">WaterUsage</Link>
            </li>
            <li>
            <Link to="/new-address">Add address</Link>
            </li>
            <li>
            <Link to="/new-watermeter">Add Watermeter</Link>
            </li>
        </ul>
        </div>
    );
};

export default Home;
