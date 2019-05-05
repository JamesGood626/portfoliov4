import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  text-decoration: none;
  /* background: lime; */
  width: 100vw;
  padding: 1.4rem 0em;

  #nav__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type: none;
    /* background: orange; */
    margin: 0;
    padding: 0;
    width: 80%;
    /* Play with this to determine ideal size for larger
    screens */
    max-width: 20rem;
  }

  #nav__list li {
    margin: 0;
    padding: 0;
  }

  #nav__list li a {
    text-decoration: none;
    color: ${props => props.theme.primaryWhite};
  }
`

const nav = () => {
  return (
    <NavContainer>
      {/* a href tags will probably suffice since I'll do the smooth
      scroll transition */}
      <ul id="nav__list">
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="https://www.alwaysbecoding.xyz/">Blog</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </NavContainer>
  )
}

export default nav
