import React, { useReducer, useState } from "react"
import { FormControl, InputGroup } from "react-bootstrap"
import styled from "styled-components"
import {
  AMERICANEXPRESS,
  OTHERCARDS,
  EXPIRYDATE,
  CVC,
  CARDARR,
  CARDICON,
} from "./constants.js"
import {
  stripeCardNumberValidation,
  stripeCardExpirValidation,
  textWithSpacesOnly,
  minLength,
} from "./validations.js"
const Wrapper = styled.div`
  color: white;
  width: 400px;
  height: 250px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
`

const BottomBox = styled.div`
  display: flex;
  button {
    margin-right: 10px;
  }
  .expiry {
    display: flex;
    flex-direction: column;
  }
  .cvc {
    display: flex;
    flex-direction: column;
  }
`

const Inputs = styled.div`
  height: 65px;
  width: 90%;
  input {
    width: ${({ inputSize }) => (inputSize === "small" ? "85%" : "100%")};
    height: 30px;
  }
`

const Buttons = styled.div`
  width: 100%;
  display: flex;
  div {
    margin-left: 25px;
    button {
      padding: 6px;
      border-radius: 10px;
      width: 80px;
    }
    .btn-grad {
      background-image: linear-gradient(
        to right,
        #f09819 0%,
        #edde5d 51%,
        #f09819 100%
      );
    }
    .btn-grad:hover {
      background-position: right center;
    }
  }
`

const Error = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: red;
`

const reducer = (state, action) => {
  switch (action.type) {
    case "card":
      return { ...state, card: action.data }
    case "expiry":
      return { ...state, expiry: action.data }
    case "securityCode":
      return { ...state, securityCode: action.data }
    case "cardHodler":
      return { ...state, cardHodler: action.data }
    case "cleanState":
      return { ...action.data }

    default:
      return state
  }
}
function findCartType(cardNumber) {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    JCB: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
  }
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) return card
  }
  return ""
}
const AddCard = (props) => {
  const [error, setError] = useState({})
  const [cardType, setCardType] = useState()
  const [state, dispatch] = useReducer(reducer, {
    card: "",
    expiry: "",
    securityCode: "",
    cardHodler: "",
  })
  const handleValidations = (type, value) => {
    let errorMsg
    switch (type) {
      case "card":
        setCardType(findCartType(type))
        errorMsg = stripeCardNumberValidation(value)
        setError({ ...error, cardError: errorMsg })
        console.log(cardType)
        break
      case "cardHodler":
        errorMsg = value == "" ? "Required" : textWithSpacesOnly(value)
        setError({ ...error, cardHodleError: errorMsg })
      case "expiry":
        errorMsg = value === "" ? "Required" : stripeCardExpirValidation(value)
        setError({ ...error, expiryError: errorMsg })
        break
      case "securityCode":
        errorMsg = value === "" ? "Required" : minLength(3)(value)
        setError({ ...error, securityCodeError: errorMsg })
        break
      default:
        break
    }
  }

  const handleInputData = (e) => {
    dispatch({ type: e.target.name, data: e.target.value })
  }
  const handleBlur = (e) => {
    handleValidations(e.target.name, e.target.value)
  }
  const checkErrorBeforeSave = () => {
    let errorValue = {}
    let isError = false
    Object.keys(state).forEach(async (val) => {
      if (state[val] === "") {
        errorValue = { ...errorValue, [`${val + "Error"}`]: "required" }
        isError = true
      }
    })
    setError(errorValue)
    return isError
  }
  const handleSave = (e) => {
    let errorCheck = checkErrorBeforeSave()
    if (!errorCheck) {
      props.setCardList([...props.cardList, { ...state, cardType }])
      dispatch("cleanState", {
        card: "",
        expiryDate: "",
        securityCode: "",
        cardHodler: "",
      })
      props.setCard(false)
    }
  }
  return (
    <>
      <form style={{ marginBottom: "10px" }}>
        <Wrapper>
          <Inputs>
            <InputGroup>
              <FormControl
                guide={false}
                placeholder="Card Number"
                name="card"
                required
                value={state.card}
                onChange={handleInputData}
                onBlur={handleBlur}
              />
            </InputGroup>
            {!error && CARDARR.includes(cardType) && (
              <img
                style={{
                  float: "right",
                  position: "relative",
                  top: "-35px",
                }}
                src={CARDICON[cardType]}
                alt="card"
                width="50px"
                height="33px"
              />
            )}
            {error && error.cardError && error.cardError.length > 1 && (
              <Error>{error.cardError}</Error>
            )}
          </Inputs>
          <Inputs>
            <input
              type="text"
              name="cardHodler"
              required
              placeholder="CardHolder's Name"
              value={state.cardHodler}
              onChange={handleInputData}
              onBlur={handleBlur}
            />
            {error &&
              error.cardHodlerError &&
              error.cardHodlerError.length > 1 && (
                <Error>{error.cardHodlerError}</Error>
              )}
          </Inputs>
          <Inputs inputSize="small">
            <BottomBox>
              <div className="expiry">
                <InputGroup>
                  <FormControl
                    name="expiry"
                    required
                    placeholder="Expiry Date (MM/YY)"
                    value={state.expiry}
                    onChange={handleInputData}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                {error && error.expiryError && error.expiryError.length > 1 && (
                  <Error>{error.expiryError}</Error>
                )}
              </div>
              <div className="cvc">
                <InputGroup>
                  <FormControl
                    name="securityCode"
                    required
                    placeholder="Secuirty Code"
                    value={state.securityCode}
                    onChange={handleInputData}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                {error &&
                  error.securityCodeError &&
                  error.securityCodeError.length > 1 && (
                    <Error>{error.securityCodeError}</Error>
                  )}
              </div>
            </BottomBox>
          </Inputs>
          <Buttons>
            <div className="button">
              <button className="btn-grad">Close</button>
            </div>
            <div className="button">
              <button className="btn-grad" type="button" onClick={handleSave}>
                Add Card
              </button>
            </div>
          </Buttons>
        </Wrapper>
      </form>
    </>
  )
}
export default AddCard
