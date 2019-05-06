import React, { useState } from "react"
import styled from "styled-components"

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 60vh;
  /* background: lime; */

  h3 {
    font-size: 1.6rem;
    color: ${props => props.theme.primaryColor};
    margin-bottom: 2rem;
  }

  #contact__form {
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 18rem;

    .contact__form-input {
      background: rgba(0, 0, 0, 0);
      border: 3px solid ${props => props.theme.primaryColor};
    }

    label {
      font-weight: 600;
      color: ${props => props.theme.primaryColor};
      transform: translate(0.4rem, 1.5rem);
    }

    input {
      height: 1.8rem;
    }

    textarea {
      height: 9rem;
    }

    button {
      margin-top: 1.6rem;
      font-size: 1rem;
      padding: 0.8em 1em;
      color: ${props => props.theme.primaryWhite};
      background: ${props => props.theme.primaryColor};
      border: none;
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
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className="contact__form-input"
          type="text"
          value={name.value}
          onChange={e => changeValue(e, setName)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="contact__form-input"
          type="text"
          value={email.value}
          onChange={e => changeValue(e, setEmail)}
        />
        <label htmlFor="mesesag">Message</label>
        <textarea
          id="message"
          className="contact__form-input"
          type="text"
          value={message.value}
          onChange={e => changeValue(e, setMessage)}
        />
        <button>SUBMIT</button>
      </form>
    </SectionContainer>
  )
}

export default contact
