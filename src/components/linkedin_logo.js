import React from "react"
import styled from "styled-components"

const SVG = styled.svg`
  #linkedin {
    fill: ${props => props.theme.primaryWhite};
  }

  &:hover {
    #linkedin {
      fill: ${props => props.theme.accentColor};
    }
  }
`

const LinkedInLogo = () => (
  <SVG
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="Mobile"
        transform="translate(-170.000000, -257.000000)"
        fill="#FBFFF8"
        fill-rule="nonzero"
      >
        <g id="HeroSection" transform="translate(0.000000, -12.000000)">
          <g
            id="SocialMediaLinks"
            transform="translate(126.000000, 269.000000)"
          >
            <g id="linkedin" transform="translate(44.000000, 0.000000)">
              <path
                d="M20.447,20.452 L16.893,20.452 L16.893,14.883 C16.893,13.555 16.866,11.846 15.041,11.846 C13.188,11.846 12.905,13.291 12.905,14.785 L12.905,20.452 L9.351,20.452 L9.351,9 L12.765,9 L12.765,10.561 L12.811,10.561 C13.288,9.661 14.448,8.711 16.181,8.711 C19.782,8.711 20.448,11.081 20.448,14.166 L20.448,20.452 L20.447,20.452 Z M5.337,7.433 C4.193,7.433 3.274,6.507 3.274,5.368 C3.274,4.23 4.194,3.305 5.337,3.305 C6.477,3.305 7.401,4.23 7.401,5.368 C7.401,6.507 6.476,7.433 5.337,7.433 Z M7.119,20.452 L3.555,20.452 L3.555,9 L7.119,9 L7.119,20.452 Z M22.225,0 L1.771,0 C0.792,0 0,0.774 0,1.729 L0,22.271 C0,23.227 0.792,24 1.771,24 L22.222,24 C23.2,24 24,23.227 24,22.271 L24,1.729 C24,0.774 23.2,0 22.222,0 L22.225,0 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </SVG>
)

export default LinkedInLogo
