/*
 *
 * Address actions
 *
 */

import axios from "axios"
import shortid from "shortid"
import {
  FETCH_ADDRESS,
  FETCH_ADDRESSES,
  ADDRESS_CHANGE,
  ADDRESS_EDIT_CHANGE,
  SET_ADDRESS_FORM_ERRORS,
  SET_ADDRESS_FORM_EDIT_ERRORS,
  RESET_ADDRESS,
  ADD_ADDRESS,
  REMOVE_ADDRESS,
  SET_ADDRESS_LOADING,
  ADDRESS_SELECT,
  FETCH_ADDRESSES_SELECT,
} from "./constants"
import handleError from "../../utils/error"
import { allFieldsValidation } from "../../utils/validation"
import { success, warning, info } from "react-notification-system-redux"
import { goBack } from "connected-react-router"
export const addressChange = (name, value) => {
  let formData = {}
  formData[name] = value

  return {
    type: ADDRESS_CHANGE,
    payload: formData,
  }
}

export const addressEditChange = (name, value) => {
  let formData = {}
  formData[name] = value

  return {
    type: ADDRESS_EDIT_CHANGE,
    payload: formData,
  }
}

export const handleAddressSelect = (value) => {
  return {
    type: ADDRESS_SELECT,
    payload: value,
  }
}

export const setAddressLoading = (value) => {
  return {
    type: SET_ADDRESS_LOADING,
    payload: value,
  }
}

export const fetchAddresses = () => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      dispatch(setAddressLoading(true))
      const response = await axios.get(endpoint + "address")
      dispatch({ type: FETCH_ADDRESSES, payload: response.data })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch(setAddressLoading(false))
    }
  }
}

// fetch address api
export const fetchAddress = (addressId) => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `address/${addressId}`)

      dispatch({
        type: FETCH_ADDRESS,
        payload: response.data,
      })
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

export const addAddress = () => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const rules = {
        address: "required",
        city: "required",
        state: "required",
        country: "required",
        zipCode: "required|min:5",
      }

      const newAddress = getState().address.addressFormData
      const isDefault = getState().address.isDefault

      const { isValid, errors } = allFieldsValidation(newAddress, rules, {
        "required.address": "Address is required.",
        "required.city": "City is required.",
        "required.state": "State is required.",
        "required.country": "Country is required.",
        "required.zipCode": "Zipcode is required.",
      })

      if (!isValid) {
        return dispatch({ type: SET_ADDRESS_FORM_ERRORS, payload: errors })
      }

      const address = {
        isDefault,
        ...newAddress,
      }

      const response = await axios.post(endpoint + "address", address)
      // console.log(response)
      const successfulOptions = {
        title: `Add address`,
        message: "Successfully added",
        position: "tr",
        autoDismiss: 3000,
        action: {
          label: "Click me!!",
          callback: () =>
            (window.location.href = "http://localhost:3000/dashboard/address"),
        },
      }
      if (response.data) {
        // dispatch(success(successfulOptions));
        dispatch({
          type: ADD_ADDRESS,
          payload: response.data.toString(),
        })
        dispatch(success(successfulOptions))
        dispatch({ type: RESET_ADDRESS })
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// update address api
export const updateAddress = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        country: "required",
        city: "required",
        state: "required",
        address: "required",
        zipCode: "required",
      }

      const newAddress = getState().address.address

      const { isValid, errors } = allFieldsValidation(newAddress, rules, {
        "required.address": "Address is required.",
        "required.city": "City is required.",
        "required.state": "State is required.",
        "required.country": "Country is required.",
        "required.zipCode": "Zipcode is required.",
      })

      if (!isValid) {
        return dispatch({
          type: SET_ADDRESS_FORM_EDIT_ERRORS,
          payload: errors,
        })
      }
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.put(
        endpoint + `address/${newAddress._id}`,
        newAddress
      )
      console.log(response)
      const successfulOptions = {
        title: `Updated address`,
        message: "Successfully updated",
        position: "tr",
        autoDismiss: 3,
        action: {
          label: "Click me!!",
          callback: () =>
            (window.location.href = "http://localhost:3000/dashboard/address"),
        },
      }
      if (response) {
        dispatch(info(successfulOptions))
        dispatch(goBack())
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// delete address api
export const deleteAddress = (id) => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.delete(endpoint + `address/${id}`)

      const successfulOptions = {
        uid: shortid,
        title: `Delete address`,
        message: "Successfully deleted",
        position: "tr",
        autoDismiss: 3,
      }
      console.log(response.data)
      if (response) {
        dispatch(success(successfulOptions))
        dispatch({
          type: REMOVE_ADDRESS,
          payload: id,
        })
        dispatch(goBack())
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}
