import React from "react"
import styled from "styled-components"
import Nav from "./nav"

const HeaderContainer = styled.header`
  position: absolute;
  height: 4rem;
  width: 100vw;
`

const Header = () => (
  <HeaderContainer>
    <Nav />
  </HeaderContainer>
)

export default Header
