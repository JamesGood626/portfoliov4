import React from "react"
import styled from "styled-components"
import GithubLogo from "./github_logo.js"
import LinkedInLogo from "./linkedin_logo.js"

const SectionContainer = styled.section`
  height: 90vh;
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
    margin-top: 11rem;
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
    z-index: 9001;
    color: ${props => props.theme.primaryWhite};
    font-size: 5rem;
  }

  #hero__lastname {
    position: absolute;
    top: 0%;
    /* reference when implementing large screen media queries */
    /* Or better yet... just implement ems */
    /* calc(50% - 1.2rem higher than the set font size) centers lastname */
    left: calc(50% - 10.2rem);
    /* background: lime; */
    color: ${props => props.theme.accentColor};
    opacity: 0.8;
    font-size: 9rem;
  }

  #hero_logo-container {
    display: flex;
    justify-content: space-between;
    width: 5rem;
    margin: 0;
    margin-top: 1.8rem;
  }

  .hero__logo {
    /* Probably switch these to ems later */
    width: 1.8rem;
  }

  #hero__secondary-title {
    font-size: 1.4rem;
    margin-top: 1.8rem;
    font-weight: 300;
    color: ${props => props.theme.primaryWhite};
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
              <GithubLogo />
              {/* <img className="hero__logo" src={GithubLogo} /> */}
            </div>
            <div>
              <LinkedInLogo />
              {/* <img className="hero__logo" src={LinkedInLogo} /> */}
            </div>
          </div>
          <h2 id="hero__secondary-title">Crafting Clean Quality Websites</h2>
        </div>
      </div>
    </SectionContainer>
  )
}

export default hero
