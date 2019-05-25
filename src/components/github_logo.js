import React from "react"
import styled from "styled-components"

const SVG = styled.svg`
  width: 1.8rem;
  height: 1.8rem;

  #github {
    fill: ${props => props.theme.primaryWhite};
  }

  &:hover {
    #github {
      fill: ${props => props.theme.accentColor};
    }
  }

  @media only screen and (min-width: 600px) {
    width: 2.4rem;
    height: 2.4rem;
  }

  /* For iPad Pro height screens */
  @media only screen and (min-height: 1366px) {
    width: 3rem;
    height: 3rem;
  }
`

const GithubLogo = () => (
  <SVG viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" stroke="none" stroke-width="1">
      <g
        id="Mobile"
        transform="translate(-126.000000, -257.000000)"
        fill="#FBFFF8"
        fillRule="nonzero"
      >
        <g id="HeroSection" transform="translate(0.000000, -12.000000)">
          <g
            id="SocialMediaLinks"
            transform="translate(126.000000, 269.000000)"
          >
            <g id="github">
              <path
                d="M12,0 C5.37,0 0,5.373 0,12 C0,17.303 3.438,21.8 8.205,23.385 C8.805,23.498 9.025,23.127 9.025,22.808 C9.025,22.523 9.015,21.768 9.01,20.768 C5.672,21.492 4.968,19.158 4.968,19.158 C4.422,17.773 3.633,17.403 3.633,17.403 C2.546,16.659 3.717,16.674 3.717,16.674 C4.922,16.758 5.555,17.91 5.555,17.91 C6.625,19.745 8.364,19.215 9.05,18.908 C9.158,18.132 9.467,17.603 9.81,17.303 C7.145,17.003 4.344,15.971 4.344,11.373 C4.344,10.063 4.809,8.993 5.579,8.153 C5.444,7.85 5.039,6.63 5.684,4.977 C5.684,4.977 6.689,4.655 8.984,6.207 C9.944,5.94 10.964,5.808 11.984,5.802 C13.004,5.808 14.024,5.94 14.984,6.207 C17.264,4.655 18.269,4.977 18.269,4.977 C18.914,6.63 18.509,7.85 18.389,8.153 C19.154,8.993 19.619,10.063 19.619,11.373 C19.619,15.983 16.814,16.998 14.144,17.293 C14.564,17.653 14.954,18.389 14.954,19.513 C14.954,21.119 14.939,22.409 14.939,22.799 C14.939,23.114 15.149,23.489 15.764,23.369 C20.565,21.795 24,17.295 24,12 C24,5.373 18.627,6.10622664e-16 12,0"
                id="Path"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </SVG>
)

export default GithubLogo
