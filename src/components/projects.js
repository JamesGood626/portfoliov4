import React, { useState, useEffect, createRef } from "react"
import styled from "styled-components"
import { TweenLite } from "gsap"
import debounce from "lodash.debounce"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import Carousel from "nuka-carousel"

// TODO:
// 1. Fix weird bug that causes crash when toggling -> followed by scrolling
//    immediately after the toggle. Next toggle after that sequence of events
//    crashes app.. "Cannot read property 'offsetTop' of null" (has something
//    to do w/ useEffect for sure...)
// If webAnimation API Suffices cross-browser
// Use this for scrollTo:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo

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
  margin-bottom: 4rem;
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

  .project__image--start {
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

  .project__display-content {
    position: absolute;
    top: 34rem;
    z-index: 9010;
    width: 90vw;
    max-width: 50rem;
    height: auto;
    font-size: 0.9rem;
    line-height: 1.4rem;
    letter-spacing: 0.05rem;
    color: ${props => props.theme.textGrey};
    padding: 1.8rem;
    padding-top: 2.8rem;
    margin-bottom: 4rem;
    display: none;
    border-radius: 4px;
    transform: translateY(-7rem);
    animation: reveal 0.6s ease-out;
  }

  @media screen and (min-width: 600px) {
    .project__display-content {
      font-size: 1rem;
      transform: translateY(0);
    }
  }

  @keyframes reveal {
    from {
      transform: translateY(20rem);
    }
  }

  /* May play around with this concept in the future */
  /* .project__display-content--contracted {
    background: orange;
    display: none;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.4);
  } */

  .project__display-content--expanded {
    background: ${props => props.theme.primaryWhite};
    display: block;
    box-shadow: 0 0 32px rgba(0, 0, 0, 0.4);
  }
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
    z-index: 9020;
    /* top: 76%; */
    color: ${props => props.theme.primaryColor};
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
  z-index: 9000;
  width: 100vw;
  height: ${props => `${props.bodyHeight}px`};
  background: ${props => props.theme.primaryColor};
  /* opacity: 0.7; */
  /* visibility: ${props => (props.toggle ? "visible" : "hidden")}; */
  transition: ${props =>
    props.visible
      ? "opacity 0.4s ease-in"
      : "visibility 0.2s 0.4s ease-in, opacity 0.4s ease-in"};
`

const flip = (el, start, end) => {
  // Get the first position.
  const first = el.getBoundingClientRect()

  // Move it to the end.
  el.classList.remove(start)
  el.classList.add(end)

  // Get the last position.
  const last = el.getBoundingClientRect()

  // Move it to the start.
  el.classList.remove(end)
  el.classList.add(start)

  // Invert.
  // invert made no difference in the animation...
  // const invert = first.top - last.top
  const invertedWidth = first.width / last.width
  const invertedHeight = first.height / last.height

  return {
    // invert,
    invertedWidth,
    invertedHeight,
  }
}

const popUp = (el, start, end, invertedWidth, invertedHeight) => {
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

const popDown = (el, start, end, invertedWidth, invertedHeight) => {
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
    const { invertedWidth, invertedHeight } = flip(
      projImage,
      "project__display-item--start",
      "project__display-item--end"
    )
    popUp(
      projImage,
      "project__display-item--start",
      "project__display-item--end",
      invertedWidth,
      invertedHeight
    )
  } else {
    const { invertedWidth, invertedHeight } = flip(
      projImage,
      "project__display-item--end",
      "project__display-item--start"
    )
    popDown(
      projImage,
      "project__display-item--start",
      "project__display-item--end",
      invertedWidth,
      invertedHeight
    )
  }
}

const toggleExpand = (
  index,
  expandedArr,
  setExpandedArr,
  projectImageRef,
  projectContainerRef
) => {
  const { offsetTop } = projectContainerRef.current
  TweenLite.to(window, 0.4, { scrollTo: offsetTop })
  let newExpandedArr = []
  const arrLen = expandedArr.length
  let project = expandedArr[index]
  handleAnimation(project.expanded, projectImageRef)
  project = { ...project, expanded: !project.expanded }
  if (index === 0) {
    // project at beginning of array
    newExpandedArr = [project, ...expandedArr.slice(1, arrLen)]
  } else if (index === arrLen - 1) {
    // project at end of array
    newExpandedArr = [...expandedArr.slice(0, arrLen - 1), project]
  } else {
    // project is in middle of the array...
  }
  setExpandedArr(newExpandedArr)
}

const handleScroll = (toggle, projectContainerRef) => {
  // the ref ends up null whenever I scroll down to the project content paragraph section and then
  // press the project title in order to trigger the animation. Odd bug that occured
  // adding projectContainerRef.current !== null is necessary to prevent it.
  if (toggle && projectContainerRef.current !== null) {
    // prevent window from being scrolled past ProjContRef's offsetTop
    const { offsetTop } = projectContainerRef.current
    if (window.scrollY < offsetTop) {
      TweenLite.to(window, 0.4, { scrollTo: offsetTop })
      // window.scrollTo({ top: offsetTop, behavior: "smooth" })
    }
  }
}

const handleResize = setTotalBodyHeight => {
  console.log("handling resize")
  setTotalBodyHeight(document.body.clientHeight)
}

const ProjectDisplay = ({
  index,
  gifUrl,
  expandedArr,
  setExpandedArr,
  projectContainerRef,
  toggle,
  setToggle,
}) => {
  useEffect(() => {
    // let scrollHandler = debounce(function() {
    //   handleScroll(toggle, projectContainerRef)
    // }, 10)
    // TODO: throttle this function:
    const scrollHandler = e => handleScroll(toggle, projectContainerRef)
    window.addEventListener("scroll", scrollHandler)
    return () => {
      window.removeEventListener("scroll", scrollHandler)
    }
  }, [toggle, projectContainerRef])
  const projectImageRef = createRef(null)
  const { expanded } = expandedArr[index]

  // Add a useEffect hook to manage window.addEventListener('scroll')
  // W/ a function that will prevent the user from scrolling higher
  // than the top of the project sections boundingClientRect when
  // toggle is true.
  // Also, when toggled -> animate the scrollPos
  // to the project section's top.
  return (
    <>
      <ProjectContainer
        key={index}
        id="project__display-inner-container"
        gifUrl={gifUrl}
        toggle={toggle}
      >
        {/* Perhaps I could refactor the projectImageRef and projectTitle elements into a separate RFC
        that utilizes a useReducer to just dispatch when the toggleAnim should occur */}
        <div
          ref={projectImageRef}
          className="project__display-item project__display-item--start"
        />
        <div
          className="project__display-item-title project__display-item-title"
          onClick={e => {
            setToggle(!toggle)
            toggleExpand(
              index,
              expandedArr,
              setExpandedArr,
              projectImageRef,
              projectContainerRef
            )
          }}
        >
          <span>
            <h4>Project Title</h4>
          </span>
        </div>
        <div
          // className="project_display-item project_display-item--contracted"
          className={
            expanded
              ? "project__display-content project__display-content--expanded"
              : "project__display-content project__display-content--contracted"
          }
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidata non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </ProjectContainer>
    </>
  )
}

// "https://media.giphy.com/media/TdufmThIzksgN3clsj/giphy.gif"
const projects = () => {
  const [expandedArr, setExpandedArr] = useState(projectUrls)
  const [totalBodyHeight, setTotalBodyHeight] = useState(0)
  const [toggle, setToggle] = useState(false)
  const projectContainerRef = createRef(null)
  useEffect(() => {
    setTotalBodyHeight(document.body.clientHeight)
    // Throttle this as well.
    const resizeHandler = () => handleResize(setTotalBodyHeight)
    window.addEventListener("resize", resizeHandler)
    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
  }, [])

  return (
    <>
      <SectionContainer ref={projectContainerRef}>
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
                projectContainerRef={projectContainerRef}
                toggle={toggle}
                setToggle={setToggle}
              />
            ))}
            {/* </Carousel> */}
          </div>
        </div>
      </SectionContainer>
      <BackgroundBlur
        className={toggle ? "modal--visible" : "modal--hidden"}
        visible={toggle}
        bodyHeight={totalBodyHeight}
      />
    </>
  )
}

export default projects
