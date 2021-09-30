import { push } from "connected-react-router"
import axios from "axios"

import {
  RESET_PASSWORD_CHANGE,
  RESET_PASSWORD_RESET,
  SET_RESET_PASSWORD_FORM_ERRORS,
} from "./constants"

import { signOut } from "../Login/actions"
import handleError from "../../utils/error"
import { allFieldsValidation } from "../../utils/validation"

export const resetPasswordChange = (name, value) => {
  let formData = {}
  formData[name] = value

  return {
    type: RESET_PASSWORD_CHANGE,
    payload: formData,
  }
}

export const resetPassowrd = (token) => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        password: "required|min:6",
        confirmPassword: "required|min:6|same:password",
      }
      const user = getState().resetPassword.resetFormData

      const { isValid, errors } = allFieldsValidation(user, rules, {
        "required.password": "Password is required.",
        "min.password": "Password must be at least 6 characters.",
        "required.confirmPassword": "Confirm password is required.",
        "min.confirmPassword":
          "Confirm password must be at least 6 characters.",
        "same.confirmPassword":
          "Confirm password and password fields must match.",
      })

      if (!isValid) {
        return dispatch({
          type: SET_RESET_PASSWORD_FORM_ERRORS,
          payload: errors,
        })
      }
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post(endpoint + `user/reset/${token}`, user)

      if (response.data) {
        dispatch(push("/login"))
      }
      dispatch({ type: RESET_PASSWORD_RESET })
    } catch (error) {
      const title = `Please try to reset again!`
      handleError(error, dispatch, title)
    }
  }
}

export const resetAccountPassword = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        password: "required|min:6",
        confirmPassword: "required|min:6|same:password",
      }

      const user = getState().resetPassword.resetFormData

      const { isValid, errors } = allFieldsValidation(user, rules, {
        "required.password": "Password is required.",
        "min.password": "Password must be at least 6 characters.",
        "required.confirmPassword": "Confirm password is required.",
        "min.confirmPassword":
          "Confirm password must be at least 6 characters.",
        "same.confirmPassword":
          "Confirm password and password fields must match.",
      })

      if (!isValid) {
        return dispatch({
          type: SET_RESET_PASSWORD_FORM_ERRORS,
          payload: errors,
        })
      }
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post(endpoint + `user/recover`, user)
      if (response.data) {
        dispatch(signOut())
      }
      dispatch({ type: RESET_PASSWORD_RESET })
    } catch (error) {
      const title = `Please try to reset again!`
      handleError(error, dispatch, title)
    }
  }
}
