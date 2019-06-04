import React, { useState, useEffect, createRef } from "react"
import styled from "styled-components"
import { TweenLite } from "gsap"
import debounce from "lodash.debounce"
import throttle from "lodash.throttle"
import ScrollToPlugin from "gsap/ScrollToPlugin"

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
  budgetSlayer: "https://media.giphy.com/media/cOtDlAqGGae9HdcR49/giphy.gif",
  // budgetSlayer: "https://media.giphy.com/media/cOtDlAqGGae9HdcR49/giphy.mp4",
}

const projectUrls = [
  { url: projectGifs.portfoliov3, title: "Portfoliov3", expanded: false },
  { url: projectGifs.pianoTube, title: "PianoTube", expanded: false },
  { url: projectGifs.budgetSlayer, title: "Budget Slayer", expanded: false },
]

const SectionContainer = styled.section`
  position: relative;
  z-index: 9001;
  width: 100vw;
  margin-bottom: 4rem;

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
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 60rem;
    /* background: blue; */
  }

  #project__display-inner-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .project__image--start {
    width: 100%;
    background: orange;
  }

  .project__display-item--start {
    position: relative;
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
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* position: absolute; */
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
        : "translateY(2rem) scale(1)"}; /* <- This is active */
    transition: transform 0.65s 0.1s ease-out;
  }

  .project__display-item-title:before {
    position: absolute;
    top: calc(105% - 0.25rem);
    left: calc(50% - 0.25rem);
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    background: ${props => props.theme.accentColor};
    border-radius: 25px;
  }

  .project__display-item-title:after {
    position: absolute;
    top: calc(105% - 0.5rem);
    left: calc(50% - 0.5rem);
    content: "";
    width: 1rem;
    height: 1rem;
    background: rgba(0, 0, 0, 0);
    border: 2px solid ${props => props.theme.accentColor};
    border-radius: 25px;
    animation: pulse 1s ease-out infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.4);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(0.4);
    }
  }

  @media screen and (max-width: 600px) {
    /* This is required for mobile fix in order to position the project
    title div at the bottom of the gif.
    If you have this applied on larger screen sizes... then the project
    title div will be near the contact section... */
    .project__display-item-title {
      bottom: 0;
    }
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
  transition: ${props =>
    props.visible
      ? "opacity 0.4s ease-in"
      : "visibility 0.2s 0.4s ease-in, opacity 0.4s ease-in"};
`

const Carousel = styled.ul`
  position: relative;
  display: inline-block;
  width: 100vw;
  height: 20rem;
  list-style-type: none;

  li {
    width: 100%;
    height: 100%;
  }

  /* .carousel__item {
    position: absolute;
    transition: transform 1s ease-out;
    transform: translateX(24rem);
  } */

  /* .project__display--current {
    transform: translateX(0rem);
  } */

  .project__display--next {
    /* display: none; */
    /* transform: translateX(24rem); */
  }
`

const CarouselItem = styled.li`
  position: absolute;
  transition: all 1s ease-out;
  transform: ${({ prev }) => prev && "translateX(-60rem)"};
  transform: ${({ current }) => current && "translateX(0rem)"};
  transform: ${({ next }) => next && "translateX(60rem)"};

  opacity: ${({ prev }) => prev && "0"};
  opacity: ${({ current }) => current && "1"};
  opacity: ${({ next }) => next && "0"};
`

const Dots = styled.div`
  display: flex;

  .carousel__dot {
    width: 0.7rem;
    height: 0.7rem;
    margin-top: 3rem;
    margin-left: 0.4rem;
    border-radius: 25px;
    border: 2px solid ${props => props.theme.primaryColor};
  }

  .carousel__dot--active {
    background: ${props => props.theme.primaryColor};
  }

  div:first-child {
    margin-left: 0;
  }
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
    newExpandedArr = [
      ...expandedArr.slice(0, index),
      project,
      ...expandedArr.slice(index + 1, arrLen),
    ]
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
  setTotalBodyHeight(document.body.clientHeight)
}

const ProjectDisplay = ({
  projectArrLength,
  index,
  currentProject,
  gifUrl,
  title,
  expandedArr,
  setExpandedArr,
  projectContainerRef,
  toggleModal,
  setToggleModal,
}) => {
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    let debouncedScroll = debounce(function() {
      handleScroll(toggle, projectContainerRef)
    }, 250)
    let scrollHandler = throttle(function() {
      debouncedScroll()
    }, 500)
    window.addEventListener("scroll", scrollHandler)
    return () => {
      window.removeEventListener("scroll", scrollHandler)
    }
  }, [toggle, projectContainerRef])
  const projectImageRef = createRef(null)
  const { expanded } = expandedArr[index]

  // nextIndex and prevIndex check for end/begginning to ensure proper order.
  const nextIndex =
    currentProject + 1 === projectArrLength ? 0 : currentProject + 1
  const prevIndex =
    currentProject - 1 === -1 ? projectArrLength - 1 : currentProject - 1
  return (
    <CarouselItem
      prev={index === prevIndex}
      current={index === currentProject}
      next={index === nextIndex}
      index={index}
    >
      <ProjectContainer
        id="project__display-inner-container"
        gifUrl={gifUrl}
        toggle={toggle}
      >
        <div
          ref={projectImageRef}
          className="project__display-item project__display-item--start"
        />
        <div
          className="project__display-item-title"
          onClick={e => {
            setToggle(!toggle)
            setToggleModal(!toggleModal)
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
            <h4>{title}</h4>
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
    </CarouselItem>
  )
}

const projects = () => {
  const [currentProject, setCurrentProject] = useState(0)
  const [expandedArr, setExpandedArr] = useState(projectUrls)
  const [totalBodyHeight, setTotalBodyHeight] = useState(0)
  const [toggleModal, setToggleModal] = useState(false)
  const projectContainerRef = createRef(null)
  useEffect(() => {
    setTotalBodyHeight(document.body.clientHeight)
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
            <Carousel>
              {expandedArr.map(({ url, title }, index) => (
                <ProjectDisplay
                  key={`${title}-${index}`}
                  projectArrLength={expandedArr.length}
                  index={index}
                  currentProject={currentProject}
                  gifUrl={url}
                  title={title}
                  expandedArr={expandedArr}
                  setExpandedArr={setExpandedArr}
                  projectContainerRef={projectContainerRef}
                  toggleModal={toggleModal}
                  setToggleModal={setToggleModal}
                />
              ))}
            </Carousel>
            <Dots>
              {expandedArr.map((_, index) => (
                <div
                  key={index}
                  className={
                    index === currentProject
                      ? `carousel__dot carousel__dot--active`
                      : `carousel__dot`
                  }
                  onClick={() => setCurrentProject(index)}
                />
              ))}
            </Dots>
          </div>
        </div>
      </SectionContainer>
      <BackgroundBlur
        className={toggleModal ? "modal--visible" : "modal--hidden"}
        visible={toggleModal}
        bodyHeight={totalBodyHeight}
      />
    </>
  )
}

export default projects
