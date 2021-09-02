/*
 *
 * Users actions
 *
 */

import axios from "axios"

import { FETCH_USERS } from "./constants"

import handleError from "../../utils/error"

export const fetchUsers = (filter) => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `/user/search`, {
        params: {
          search: filter.value,
        },
      })

      dispatch({ type: FETCH_USERS, payload: response.data.users })
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

export const searchUsers = (filter) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchUsers(filter))
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}
