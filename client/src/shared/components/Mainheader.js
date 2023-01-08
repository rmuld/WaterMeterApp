import React from 'react';
import styled from 'styled-components';
import NavLinks from './NavLinks';

const StyledHeader = styled('header')`
width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #d2a5bd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
  padding: 0 1rem;
  z-index: 5;
  justify-content: space-between;

  & main {
    margin-top: 5rem;
  }
`;

const MainHeader = () => {
  return (
    <StyledHeader>
      <NavLinks />
    </StyledHeader>);
};

export default MainHeader;