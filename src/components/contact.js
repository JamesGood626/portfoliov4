import React, { useState, useReducer } from "react"
import axios from "axios"
import styled from "styled-components"

const aws_email_url = process.env.GATSBY_AWS_EMAIL_LAMBDA_URL
const NAME = "NAME"
const EMAIL = "EMAIL"
const MESSAGE = "MESSAGE"
const TOGGLE = "TOGGLE"
const SET_VALUE = "SET_VALUE"
const SET_ERROR = "SET_ERROR"

// Dafuq

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding-bottom: 4rem;
  /* height: 60vh; */

  h3 {
    font-size: 1.6rem;
    color: ${props => props.theme.primaryColor};
    margin-bottom: 1.2rem;
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
      position: relative;
      display: flex;
      flex-direction: column;
      padding-bottom: 1rem;

      label {
        font-weight: 600;
        color: ${props => props.theme.primaryColor};
        transform: translate(0.6rem, 1.7rem);
        transition: transform 0.4s;
      }

      input {
        height: 2.2rem;
      }

      textarea {
        height: 9rem;
      }

      /* Label's position when the input is focused */
      .input-active {
        transform: translate(-2rem, 0rem) scale(0.8);
      }

      @media screen and (min-width: 450px) {
        .input-active {
          transform: translate(-2.4rem, 0rem) scale(0.8);
        }
      }

      @media screen and (min-width: 500px) {
        .input-active {
          transform: translate(-2.6rem, 0rem) scale(0.8);
        }
      }

      @media screen and (min-width: 550px) {
        .input-active {
          transform: translate(-2.8rem, 0rem) scale(0.8);
        }
      }

      @media screen and (min-width: 600px) {
        .input-active {
          transform: translate(-3rem, 0rem) scale(0.8);
        }
      }

      .contact__form-input--error {
        position: absolute;
        font-size: 0.85rem;
        top: 3.5rem;
        color: red;
      }

      .contact__form-text-area--error {
        position: absolute;
        font-size: 0.85rem;
        top: 10.3rem;
        color: red;
      }
    }

    button {
      margin-top: 1.2rem;
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

const getErrMessage = inputField => {
  switch (inputField) {
    case NAME:
      return (
        <span className="contact__form-input--error">
          Please enter a valid Name
        </span>
      )
    case EMAIL:
      return (
        <span className="contact__form-input--error">
          Please enter a valid Email
        </span>
      )
    case MESSAGE:
      return (
        <span className="contact__form-text-area--error">
          Please enter a valid Message
        </span>
      )
  }
}

// inputField -> "NAME", "EMAIL", "MESSAGE"
const toggle = (state, { inputField }) => {
  if (state[inputField].value === "") {
    return {
      ...state,
      [inputField]: {
        ...state[inputField],
        toggle: !state[inputField].toggle,
      },
    }
  }
  return state
}

const setValue = (state, { inputField, value }) => ({
  ...state,
  [inputField]: {
    ...state[inputField],
    value,
  },
})

const setError = (state, { inputField, err }) => ({
  ...state,
  [inputField]: {
    ...state[inputField],
    err,
  },
})

const initialFormState = {
  NAME: { value: "", err: false, toggle: false },
  EMAIL: { value: "", err: false, toggle: false },
  MESSAGE: { value: "", err: false, toggle: false },
}

const useFormReducer = (state, action) => {
  switch (action.type) {
    case SET_VALUE:
      return setValue(state, action.payload)
    case SET_ERROR:
      return setError(state, action.payload)
    case TOGGLE:
      return toggle(state, action.payload)
    default:
      throw new Error()
  }
}

const contact = () => {
  const [state, dispatch] = useReducer(useFormReducer, initialFormState)
  // console.log("THE STATE: ", state)

  const labelAnimClass = inputField => {
    return state[inputField].toggle ? "input-active" : null
  }

  const toggleLabelAnim = inputField => {
    dispatch({ type: TOGGLE, payload: { inputField } })
  }

  const setError = (inputField, err) => {
    dispatch({ type: SET_ERROR, payload: { inputField, err } })
  }

  const validateValue = (value, inputField) => {
    // TODO: Implement validation functions below.
    switch (inputField) {
      case NAME:
        return false
      case EMAIL:
        return false
      case MESSAGE:
        return false
    }
  }
  // compose this w/ a function that validates a particular inputField
  // validateValue = String => validatesString => invokes changeInputValue if successful
  // else setToggleError (Well... you'll fire both actions anyway, but you'll set a bool flag for
  // the error)
  const changeInputValue = (value, inputField) => {
    let err = validateValue(value, inputField)
    dispatch({
      type: SET_VALUE,
      payload: { value, inputField },
    })
    dispatch({
      type: SET_ERROR,
      payload: { err, inputField },
    })
  }

  const showErr = inputField => {
    const { err } = state[inputField]
    return err ? getErrMessage(inputField) : null
  }

  return (
    <SectionContainer>
      <h3>Contact</h3>
      <form
        id="contact__form"
        onSubmit={async e => {
          e.preventDefault()
          // sendEmail
          const { NAME, EMAIL, MESSAGE } = state
          const result = await axios.post(aws_email_url, {
            name: NAME.value,
            email: EMAIL.value,
            message: MESSAGE.value,
          })
          console.log("DA RESULT: ", result)
        }}
      >
        <div className="contact__form-input-container">
          <label htmlFor="name" className={labelAnimClass(NAME)}>
            Name
          </label>
          <input
            id="name"
            className="contact__form-input"
            type="text"
            value={state[NAME].value}
            onChange={e => changeInputValue(e.target.value, NAME)}
            onFocus={() => toggleLabelAnim(NAME)}
            onBlur={() => toggleLabelAnim(NAME)}
          />
          {showErr(NAME)}
        </div>
        <div className="contact__form-input-container">
          <label htmlFor="email" className={labelAnimClass(EMAIL)}>
            Email
          </label>
          <input
            id="email"
            className="contact__form-input"
            type="text"
            value={state[EMAIL].value}
            onChange={e => changeInputValue(e.target.value, EMAIL)}
            onFocus={() => toggleLabelAnim(EMAIL)}
            onBlur={() => toggleLabelAnim(EMAIL)}
          />
          {showErr(EMAIL)}
        </div>
        <div className="contact__form-input-container">
          <label htmlFor="message" className={labelAnimClass(MESSAGE)}>
            Message
          </label>
          <textarea
            id="message"
            className="contact__form-input"
            type="text"
            value={state[MESSAGE].value}
            onChange={e => changeInputValue(e.target.value, MESSAGE)}
            onFocus={() => toggleLabelAnim(MESSAGE)}
            onBlur={() => toggleLabelAnim(MESSAGE)}
          />
          {showErr(MESSAGE)}
        </div>
        <button
          disabled={state[NAME].err || state[EMAIL].err || state[MESSAGE].err}
        >
          SUBMIT
        </button>
      </form>
    </SectionContainer>
  )
}

export default contact
