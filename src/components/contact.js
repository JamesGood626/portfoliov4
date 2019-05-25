import React, { useState } from "react"
import styled from "styled-components"

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding-bottom: 4rem;
  /* height: 60vh; */
  /* background: lime; */

  h3 {
    font-size: 1.6rem;
    color: ${props => props.theme.primaryColor};
    margin-bottom: 2rem;
  }

  #contact__form {
    display: flex;
    flex-direction: column;
    width: 80vw;
    max-width: 30rem;

    .contact__form-input {
      background: rgba(0, 0, 0, 0);
      padding: 0.4rem;
      font-size: 0.9rem;
      color: ${props => props.theme.primaryColor};
      border: 3px solid ${props => props.theme.primaryColor};
    }

    .contact__form-input-container {
      display: flex;
      flex-direction: column;
      padding-bottom: 1rem;

      label {
        font-weight: 600;
        color: ${props => props.theme.primaryColor};
        transform: translate(0.6rem, 1.7rem);
        /* End state when form focused/has input value */
        /* transform: translate(0rem, -0.2rem); */
      }

      input {
        height: 2.2rem;
      }

      textarea {
        height: 9rem;
      }
    }

    button {
      margin-top: 0.6rem;
      font-size: 1rem;
      padding: 0.8em 1em;
      color: ${props => props.theme.primaryWhite};
      background: ${props => props.theme.primaryColor};
      border: none;
      box-shadow: inset 0 0 0 0 #35e0f0;
      transition: 0.2s ease-out;

      &:hover {
        cursor: pointer;
        box-shadow: ${props =>
          `inset 0 3.125rem 0 0 ${props.theme.accentColor}`};
      }
    }
  }
`

const contact = () => {
  const [name, setName] = useState({ value: "", err: false })
  const [email, setEmail] = useState({ value: "", err: false })
  const [message, setMessage] = useState({ value: "", err: false })

  const changeValue = (e, setValue) => {
    const { value } = e.target
    setValue({ value, err: false })
  }

  return (
    <SectionContainer>
      <h3>Contact</h3>
      <form id="contact__form">
        <div className="contact__form-input-container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="contact__form-input"
            type="text"
            value={name.value}
            onChange={e => changeValue(e, setName)}
          />
        </div>
        <div className="contact__form-input-container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="contact__form-input"
            type="text"
            value={email.value}
            onChange={e => changeValue(e, setEmail)}
          />
        </div>
        <div className="contact__form-input-container">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="contact__form-input"
            type="text"
            value={message.value}
            onChange={e => changeValue(e, setMessage)}
          />
        </div>
        <button>SUBMIT</button>
      </form>
    </SectionContainer>
  )
}

export default contact
