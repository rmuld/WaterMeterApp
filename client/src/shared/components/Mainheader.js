import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled(header)`
width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #ff0055;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
  padding: 0 1rem;
  z-index: 5;
  justify-content: space-between;

  & main {
    margin-top: 5rem;
  }
`;

const MainHeader = props => {
  return <header className="main-header">{props.children}</header>;
};

export default MainHeader;