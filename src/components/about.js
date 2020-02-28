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
          Navy Veteran and self-taught Full Stack Web Developer (since 2017)
          with a keen interest in functional programming, TDD, web &
          infrastructure security, and cloud services.
        </p>
      </div>
    </SectionContainer>
  )
}

export default about
