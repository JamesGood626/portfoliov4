import React from "react"
import styled from "styled-components"

const SectionContainer = styled.section`
  width: 100vw;
  height: 60vh;
  /* background: lime; */
  padding-bottom: 2rem;

  #project__content {
    display: flex;
    align-items: center;
    flex-direction: column;

    h3 {
      font-size: 1.6rem;
      color: ${props => props.theme.primaryColor};
      margin-bottom: 2rem;
    }
  }

  #project__display {
    display: flex;
    justify-content: center;
    width: 90%;
    max-width: 60rem;
    /* background: lime; */
  }

  #project__display-inner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .project__display-item {
    width: 18rem;
    height: 18rem;
    background: ${props => props.theme.primaryColor};
    border-radius: 4px;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
  }

  .project__display-item-desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 14rem;
    height: 3.8rem;
    background: ${props => props.theme.primaryWhite};
    border-radius: 4px;
    padding: 1rem 2rem;
    text-align: center;
    transform: translateY(-2rem);
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.4);
  }

  .project_display-item--expandable {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: orange;
    display: none;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.4);
  }
`

const projects = () => {
  return (
    <SectionContainer>
      <div id="project__content">
        <h3>Projects</h3>
        <div id="project__display">
          <div id="project__display-inner-container">
            <div className="project__display-item" />
            <div className="project__display-item-desc">
              <h4>Project Desc Title</h4>
              <div className="project_display-item--expandable">
                <p>Some Lorem Ipsum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default projects
