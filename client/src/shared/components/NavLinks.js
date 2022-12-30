import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const NavLinksContainer = styled('ul')`
list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & li {
    margin: 0 0.5rem;
  }

  & a {
    border: 1px solid transparent;
  color: #292929;
  text-decoration: none;
  padding: 0.5rem;
  }

  & a:hover,
  a:active,
  a.active {
    background: #f8df00;
  border-color: #292929;
  color: #292929;
  }

  & button {
    cursor: pointer;
  border: 1px solid #292929;
  color: #292929;
  background: transparent;
  padding: 0.5rem;
  font: inherit;
  }

  & button:focus {
    outline: none;
  }

  & button:hover,
  button:active {
    background: #292929;
  color: white;
  }
`;

const NavLinks = () => {
    const auth = useContext(AuthContext);

    return (
        <NavLinksContainer>
            <li>
                <NavLink to="/">Avaleht</NavLink>
            </li>
            {auth.isLoggedIn && (
            <li>
                <NavLink to="/waterusage">Vee tarbimine</NavLink>
          </li>)}
          {auth.isLoggedIn && (
            <li>
              <button onClick={auth.logout}>LOGOUT</button>
            </li>
          )}
            
            
        </NavLinksContainer>
    )
}

export default NavLinks;