/*
 *
 * Account actions
 *
 */

// import { success } from 'react-notification-system-redux';
import axios from "axios"
import {
  ACCOUNT_CHANGE,
  FETCH_PROFILE,
  CLEAR_ACCOUNT,
  SET_PROFILE_LOADING,
} from "./constants"
import handleError from "../../utils/error"

axios.defaults.withCredentials = true // cookies for everyone everywhere all the time

export const accountChange = (name, value) => {
  let formData = {}
  formData[name] = value

  return {
    type: ACCOUNT_CHANGE,
    payload: formData,
  }
}

export const clearAccount = () => {
  return {
    type: CLEAR_ACCOUNT,
  }
}

export const setProfileLoading = (value) => {
  return {
    type: SET_PROFILE_LOADING,
    payload: value,
  }
}

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      dispatch(setProfileLoading(true))
      const response = await axios.get(endpoint + "user/me")
      // console.log(response)
      dispatch({ type: FETCH_PROFILE, payload: response.data })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch(setProfileLoading(false))
    }
  }
}

export const updateProfile = () => {
  return async (dispatch, getState) => {
    const profile = getState().account.user

    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.put(endpoint + "user/me", {
        ...profile,
      })

      // const successfulOptions = {
      //   title: `${response.data.message}`,
      //   position: 'tr',
      //   autoDismiss: 1
      // };
      // console.log(response.user)
      dispatch({ type: FETCH_PROFILE, payload: response.data })

      // dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}
