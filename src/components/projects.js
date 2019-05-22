import React, { useState, createRef } from "react"
import styled from "styled-components"
import Carousel from "nuka-carousel"

// Carousel styles won't work w/ animation..
// gif is clipped by .slider-frame

const projectGifs = {
  portfoliov3: "https://media.giphy.com/media/TdufmThIzksgN3clsj/giphy.gif",
  pianoTube: "https://media.giphy.com/media/Ll8BgZtyxlZOTbxQjh/giphy.gif",
}

const projectUrls = [
  { url: projectGifs.portfoliov3, expanded: false },
  // { url: projectGifs.pianoTube, expanded: false },
]

const SectionContainer = styled.section`
  position: relative;
  z-index: 9001;
  width: 100vw;
  /* background: lime; */
  padding-bottom: 4rem;
  height: 26rem;

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

  .project_image--start {
    width: 100%;
    background: orange;
  }

  .project__display-item--start {
    width: 80vw;
    max-width: 30rem;
    height: 18rem;
    border-radius: 4px;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
  }

  .project__display-item--end {
    position: absolute;
    width: 90vw;
    max-width: 50rem;
    height: 24rem;
    border-radius: 4px;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.2);
  }

  @media screen and (min-width: 600px) {
    .project__display-item--end {
      height: 30rem;
    }
  }

  .project_display-item--contracted {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: orange;
    display: none;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.4);
  }

  .project_display-item--expanded {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20rem;
    background: orange;
    display: block;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.4);
  }

  /* @media screen and (min-width: 400px) {
    .project__display-item {
      width: 80vw;
      max-width: 30rem;
    }
  } */
`

const ProjectTitle = styled.div`
  transform: ${props =>
    props.toggle ? "translateY(30rem) scale(2)" : "translateY(10rem) scale(1)"};
  transition: transform 0.6s ease-in-out;
`

const ProjectContainer = styled.div`
  position: relative;
  z-index: 9002;
  .project__display-item {
    background: ${props => `url(${props.gifUrl})`};
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
  }

  .project__display-item-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    /* top: 76%; */
    background: ${props => props.theme.primaryWhite};
    border-radius: 4px;
    padding: 1rem 2rem;
    text-align: center;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.4);
    width: 14rem;
    height: 3.8rem;
    left: calc(50% - 7rem);
    transform: ${props =>
      props.toggle
        ? "translateY(24rem) scale(1.3)"
        : "translateY(16rem) scale(1)"};
    transition: transform 0.65s 0.1s ease-out;
  }

  @media screen and (min-width: 600px) {
    .project__display-item-title {
      transform: ${props =>
        props.toggle
          ? "translateY(30rem) scale(1.8)"
          : "translateY(16rem) scale(1)"};
    }
  }

  .project__display-item-title span {
    text-align: center;
    width: 100%;
  }
`

const BackgroundBlur = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  /* z-index: 9000; */
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.primaryColor};
  opacity: 0.5;
`

const flip = (el, start, end) => {
  // Get the first position.
  var first = el.getBoundingClientRect()

  // Move it to the end.
  el.classList.remove(start)
  el.classList.add(end)

  // Get the last position.
  var last = el.getBoundingClientRect()

  // Move it to the start.
  el.classList.remove(end)
  el.classList.add(start)

  // Invert.
  var invert = first.top - last.top
  var invertedWidth = first.width / last.width
  var invertedHeight = first.height / last.height

  return {
    invert,
    invertedWidth,
    invertedHeight,
  }
}

const popUp = (el, start, end, invert, invertedWidth, invertedHeight) => {
  // el.classList.remove('start');
  el.classList.remove(start)
  el.classList.add(end)
  // Go from the inverted position to last.
  el.animate(
    [
      {
        // percentage value for translateY arbitrarily tweaked to achieve smooth transition
        transform: `scale(${invertedWidth}, ${invertedHeight}) translateY(-35%)`,
      },
      { transform: `scale(1, 1) translateY(0px)` },
    ],
    {
      duration: 700,
      easing: "cubic-bezier(0,0,0.32,1)",
    }
  )
}

const popDown = (el, start, end, invert, invertedWidth, invertedHeight) => {
  el.classList.remove(end)
  el.classList.add(start)
  // Go from the inverted position to last.
  el.animate(
    [
      {
        // percentage value for translateY arbitrarily tweaked to achieve smooth transition
        transform: `scale(${invertedWidth}, ${invertedHeight}) translateY(20%)`,
      },
      { transform: `scale(1, 1) translateY(0px)` },
    ],
    {
      duration: 700,
      easing: "cubic-bezier(0,0,0.32,1)",
    }
  )
}

// project__display-item--start
const handleAnimation = (expanded, projectImageRef) => {
  const { current: projImage } = projectImageRef
  if (!expanded) {
    const { invert, invertedWidth, invertedHeight } = flip(
      projImage,
      "project__display-item--start",
      "project__display-item--end"
    )
    popUp(
      projImage,
      "project__display-item--start",
      "project__display-item--end",
      invert,
      invertedWidth,
      invertedHeight
    )
  } else {
    const { invert, invertedWidth, invertedHeight } = flip(
      projImage,
      "project__display-item--end",
      "project__display-item--start"
    )
    popDown(
      projImage,
      "project__display-item--start",
      "project__display-item--end",
      invert,
      invertedWidth,
      invertedHeight
    )
  }
}

const toggleExpand = (index, expandedArr, setExpandedArr, projectImageRef) => {
  let newExpandedArr = []
  const arrLen = expandedArr.length
  let project = expandedArr[index]
  handleAnimation(project.expanded, projectImageRef)
  project = { ...project, expanded: !project.expanded }
  if (index === 0) {
    newExpandedArr = [project, ...expandedArr.slice(1, arrLen)]
  } else if (index === arrLen - 1) {
    newExpandedArr = [...expandedArr.slice(0, arrLen - 1), project]
  } else {
    // project is in middle of the array...
  }
  setExpandedArr(newExpandedArr)
}

const ProjectDisplay = ({ index, gifUrl, expandedArr, setExpandedArr }) => {
  const [toggle, setToggle] = useState(false)
  const projectImageRef = createRef(null)
  const { expanded } = expandedArr[index]

  // Add a useEffect hook to manage window.addEventListener('scroll')
  // W/ a function that will prevent the user from scrolling higher
  // than the top of the project sections boundingClientRect when
  // toggle is true.
  // Also, when toggle is toggled from false to true. Animate the scrollPos
  // to the project section's top.
  return (
    <>
      <ProjectContainer
        key={index}
        id="project__display-inner-container"
        gifUrl={gifUrl}
        toggle={toggle}
      >
        <div
          ref={projectImageRef}
          className="project__display-item project__display-item--start"
        />
        <div
          className="project__display-item-title project__display-item-title"
          onClick={e => {
            setToggle(!toggle)
            toggleExpand(index, expandedArr, setExpandedArr, projectImageRef)
          }}
        >
          <span>
            <h4>Project Title</h4>
          </span>
          <div
            className="project_display-item--contracted"
            // className={
            //   expanded
            //     ? "project_display-item--expanded"
            //     : "project_display-item--contracted"
            // }
          >
            <p>Some Lorem Ipsum</p>
          </div>
        </div>
      </ProjectContainer>
      {toggle && <BackgroundBlur onScroll={e => console.log("Scrollin")} />}
    </>
  )
}

// "https://media.giphy.com/media/TdufmThIzksgN3clsj/giphy.gif"
const projects = () => {
  const [expandedArr, setExpandedArr] = useState(projectUrls)
  return (
    <SectionContainer>
      <div id="project__content">
        <h3>Projects</h3>
        <div id="project__display">
          {/* <Carousel> */}
          {expandedArr.map(({ url }, index) => (
            <ProjectDisplay
              index={index}
              gifUrl={url}
              expandedArr={expandedArr}
              setExpandedArr={setExpandedArr}
            />
          ))}
          {/* </Carousel> */}
        </div>
      </div>
    </SectionContainer>
  )
}

export default projects
