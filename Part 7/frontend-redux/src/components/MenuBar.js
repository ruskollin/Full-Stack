import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  background: #9fe5f6;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  width: 350px;
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 20;

  @media (max-width: 576px) {
      width: 100%;
    }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0D0C1D;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #343078;
    }
  }
`

const MenuBar = ({ open, setOpen }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/" style={{ marginTop: '10rem', justifyContent: 'center', display: 'flex' }} onClick={() => setOpen(false)}>
        <span role="img" aria-label="home">🏠</span>
                Home
      </Link>
      <Link to="/users" style={{ justifyContent: 'center', display: 'flex' }} onClick={() => setOpen(false)}>
        <span role="img" aria-label="users">🙉</span>
                Users
      </Link>
    </StyledMenu>
  )
}

export default MenuBar