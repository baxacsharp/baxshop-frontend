import axios from "axios"
import { push } from "connected-react-router"
import {
  LOGIN_CHANGE,
  LOGIN_RESET,
  SET_LOGIN_LOADING,
  SET_LOGIN_FORM_ERRORS,
  SET_LOGIN_SUBMITTING,
} from "./constants"
import { setAuth, clearAuth } from "../Authentication/actions"
import setToken from "../../utils/token"
import handleError from "../../utils/error"
import { clearAccount } from "../Account/actions"
import { allFieldsValidation } from "../../utils/validation"

export const loginChange = (name, value) => {
  let formData = {}
  formData[name] = value

  return {
    type: LOGIN_CHANGE,
    payload: formData,
  }
}

export const login = () => {
  return async (dispatch, getState) => {
    const rules = {
      email: "required|email",
      password: "required|min:6",
    }

    const user = getState().login.loginFormData

    const { isValid, errors } = allFieldsValidation(user, rules, {
      "required.email": "Email is required.",
      "email.email": "Email format is invalid.",
      "required.password": "Password is required.",
      "min.password": "Password must be at least 6 characters.",
    })

    if (!isValid) {
      return dispatch({ type: SET_LOGIN_FORM_ERRORS, payload: errors })
    }

    dispatch({ type: SET_LOGIN_SUBMITTING, payload: true })
    dispatch({ type: SET_LOGIN_LOADING, payload: true })

    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post(endpoint + "user/login", user)

      const firstName = response.data.user.firstName

      localStorage.setItem("token", response.data.accessToken)
      setToken(response.data.accessToken)
      dispatch(setAuth())
      dispatch({ type: LOGIN_RESET })
    } catch (error) {
      const title = `Please try to login again!`
      handleError(error, dispatch, title)
    } finally {
      dispatch({ type: SET_LOGIN_SUBMITTING, payload: false })
      dispatch({ type: SET_LOGIN_LOADING, payload: false })
    }
  }
}

export const signOut = () => {
  return (dispatch) => {
    dispatch(clearAuth())
    dispatch(clearAccount())
    dispatch(push("/login"))

    localStorage.removeItem("token")
  }
}
