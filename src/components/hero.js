import React from "react"
import styled from "styled-components"
import GithubLogo from "./github_logo.js"
import LinkedInLogo from "./linkedin_logo.js"

const SectionContainer = styled.section`
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.primaryColor};

  #hero__content {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 28rem;
    padding: 0.001rem;
    /* background: lime; */
  }

  /* It's weird, setting margin-top on the hero__content
  div pushes the SectionContainer and Nav down... revealing
  the white background of the body. So I'm forced to do this
  extra nesting for now. AND! -> this only works if I add a slight
  padding to the hero__content, otherwise I get the same result.
  */
  #hero_content-jankfix-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 26vmax;
    /* background: blue; */
    height: 20rem;
  }

  #hero__main-title {
    position: relative;
    /* background: orange; */
    /* Setting this so that I can determine the spacing
    between bottom of lastname and the logos */
    height: 9.2rem;
  }

  #hero__firstname {
    position: relative;
    z-index: 8000;
    color: ${props => props.theme.primaryWhite};
    font-size: 4rem;
  }

  #hero__lastname {
    position: absolute;
    top: 0%;
    /* Necessary for centering lastname */
    left: calc(50% - 9.2rem);
    /* background: lime; */
    color: ${props => props.theme.accentColor};
    opacity: 0.8;
    font-size: 8rem;
  }

  #hero_logo-container {
    display: flex;
    justify-content: space-between;
    width: 5rem;
    margin: 0;
    margin-top: 1.8rem;
  }

  #hero__secondary-title {
    font-size: 1.2rem;
    margin-top: 1.8rem;
    font-weight: 300;
    letter-spacing: 0.05rem;
    color: ${props => props.theme.primaryWhite};
  }

  @media screen and (min-width: 400px) {
    .hero__firstname {
      font-size: 5rem;
    }

    .hero__lastname {
      font-size: 9rem;
      left: calc(50% - 10.2rem);
    }
  }

  /* Could add more media queries for larger screens.... If only
  I had one laying around to see the results */
  @media only screen and (min-width: 600px) {
    #hero_content-jankfix-container {
      margin-top: 26vmin;
    }

    #hero__main-title {
      /* Pushes the icons down */
      margin-bottom: 3rem;
    }

    #hero__firstname {
      font-size: 6.4rem;
    }

    #hero__lastname {
      /* Necessary for centering lastname */
      left: calc(50% - 13.2rem);
      font-size: 11rem;
    }

    #hero_logo-container {
      width: 7rem;
    }

    #hero__secondary-title {
      font-size: 1.6rem;
    }
  }

  /* For iPad Pro height screens */
  @media only screen and (min-height: 1366px) {
    #hero__main-title {
      /* Pushes the icons down */
      margin-bottom: 5rem;
    }

    #hero_content-jankfix-container {
      margin-top: 24rem;
      height: 26rem;
    }

    #hero__firstname {
      font-size: 7.2rem;
    }

    #hero__lastname {
      /* Necessary for centering lastname */
      left: calc(50% - 14.8rem);
      font-size: 13rem;
    }

    #hero__secondary-title {
      font-size: 2rem;
    }

    #hero_logo-container {
      width: 9rem;
    }
  }
`

const hero = () => {
  return (
    <SectionContainer>
      <div id="hero__content">
        <div id="hero_content-jankfix-container">
          <h1 id="hero__main-title">
            <span id="hero__firstname">James</span>{" "}
            <span id="hero__lastname">Good</span>
          </h1>
          <div id="hero_logo-container">
            <div>
              <a href="https://github.com/JamesGood626">
                <GithubLogo />
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/james-good-510a0b66/">
                <LinkedInLogo />
              </a>
            </div>
          </div>
          <h2 id="hero__secondary-title">Crafting Clean Quality Websites</h2>
        </div>
      </div>
    </SectionContainer>
  )
}

export default hero
