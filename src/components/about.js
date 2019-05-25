import React from "react"
import styled from "styled-components"

const SectionContainer = styled.section`
  position: relative;
  z-index: 8010;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
  padding-bottom: 2rem;

  #about__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-4rem);
    width: 80vw;
    max-width: 30rem;
    background: ${props => props.theme.primaryWhite};
    padding: 1.8rem 2.4rem;
    border-radius: 4px;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);

    h3 {
      font-size: 1.6rem;
      color: ${props => props.theme.primaryColor};
      margin-bottom: 1.2rem;
    }

    p {
      color: #707070;
      font-size: 0.9rem;
      line-height: 1.4rem;
      letter-spacing: 0.05rem;
      color: ${props => props.theme.textGrey};
    }

    @media screen and (min-width: 600px) {
      p {
        font-size: 1rem;
      }
    }
  }
`

const about = () => {
  return (
    <SectionContainer>
      <div id="about__content">
        <h3>About</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidata non proident, sunt in culpa
          qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </SectionContainer>
  )
}

export default about
