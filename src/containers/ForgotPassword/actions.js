/*
 *
 * ForgotPassword actions
 *
 */

import { push } from "connected-react-router"
// import { success } from 'react-notification-system-redux';
import axios from "axios"

import {
  FORGOT_PASSWORD_CHANGE,
  FORGOT_PASSWORD_RESET,
  SET_FORGOT_PASSWORD_FORM_ERRORS,
} from "./constants"
import handleError from "../../utils/error"
import { allFieldsValidation } from "../../utils/validation"

export const forgotPasswordChange = (name, value) => {
  return {
    type: FORGOT_PASSWORD_CHANGE,
    payload: value,
  }
}

export const forgotPassowrd = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        email: "required|email",
      }

      const user = getState().forgotPassword.forgotFormData

      const { isValid, errors } = allFieldsValidation(user, rules, {
        "required.email": "Email is required.",
      })

      if (!isValid) {
        return dispatch({
          type: SET_FORGOT_PASSWORD_FORM_ERRORS,
          payload: errors,
        })
      }
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post(endpoint + "user/recover", user)

      if (response.data) {
        dispatch(push("/login"))
      }
      dispatch({ type: FORGOT_PASSWORD_RESET })
    } catch (error) {
      const title = `Please try again!`
      handleError(error, dispatch, title)
    }
  }
}
