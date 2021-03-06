/*
 *
 * Category actions
 *
 */

import { goBack } from "connected-react-router"
import { success, warning, info } from "react-notification-system-redux"
import axios from "axios"

import {
  FETCH_CATEGORIES,
  FETCH_STORE_CATEGORIES,
  FETCH_CATEGORY,
  CATEGORY_CHANGE,
  CATEGORY_EDIT_CHANGE,
  SET_CATEGORY_FORM_ERRORS,
  SET_CATEGORY_FORM_EDIT_ERRORS,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  SET_CATEGORIES_LOADING,
  RESET_CATEGORY,
  CATEGORY_SELECT,
} from "./constants"

import handleError from "../../utils/error"
import {
  formatSelectOptions,
  unformatSelectOptions,
} from "../../helpers/select"
import { allFieldsValidation } from "../../utils/validation"

export const categoryChange = (name, value) => {
  let formData = {}
  formData[name] = value

  return {
    type: CATEGORY_CHANGE,
    payload: formData,
  }
}

export const categoryEditChange = (name, value) => {
  let formData = {}
  formData[name] = value

  return {
    type: CATEGORY_EDIT_CHANGE,
    payload: formData,
  }
}

export const categorySelect = (value) => {
  return {
    type: CATEGORY_SELECT,
    payload: value,
  }
}

export const resetCategory = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_CATEGORY })
  }
}

// fetch store categories api
export const fetchStoreCategories = () => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `category/list`)

      dispatch({
        type: FETCH_STORE_CATEGORIES,
        payload: response.data.categories,
      })
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// fetch categories api
export const fetchCategories = () => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      dispatch({ type: SET_CATEGORIES_LOADING, payload: true })
      const response = await axios.get(endpoint + `category`)

      dispatch({
        type: FETCH_CATEGORIES,
        payload: response.data,
      })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch({ type: SET_CATEGORIES_LOADING, payload: false })
    }
  }
}

// fetch category api
export const fetchCategory = (id) => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `category/${id}`)

      response.data.products = formatSelectOptions(response.data.products)

      dispatch({
        type: FETCH_CATEGORY,
        payload: response.data,
      })
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// add category api
export const addCategory = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: "required",
        description: "required|max:200",
        products: "required",
      }

      const category = getState().category.categoryFormData

      const newCategory = {
        name: category.name,
        description: category.description,
        products: unformatSelectOptions(category.products),
      }

      const { isValid, errors } = allFieldsValidation(newCategory, rules, {
        "required.name": "Name is required.",
        "required.description": "Description is required.",
        "max.description":
          "Description may not be greater than 200 characters.",
        "required.products": "Products are required.",
      })

      if (!isValid) {
        return dispatch({ type: SET_CATEGORY_FORM_ERRORS, payload: errors })
      }
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post(endpoint + `category`, newCategory)

      const successfulOptions = {
        title: `Add category`,
        message: "SuccessFully added",
        position: "tr",
        autoDismiss: 1,
      }

      if (response.data) {
        dispatch(success(successfulOptions))
        dispatch({
          type: ADD_CATEGORY,
          payload: response.data.category,
        })
        dispatch(resetCategory())
        dispatch(goBack())
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// update category api
export const updateCategory = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: "required",
        description: "required|max:200",
        products: "required",
      }

      const category = getState().category.category

      const newCategory = {
        name: category.name,
        description: category.description,
        products: category.products && unformatSelectOptions(category.products),
      }

      const { isValid, errors } = allFieldsValidation(newCategory, rules, {
        "required.name": "Name is required.",
        "required.description": "Description is required.",
        "max.description":
          "Description may not be greater than 200 characters.",
        "required.products": "Products are required.",
      })

      if (!isValid) {
        return dispatch({
          type: SET_CATEGORY_FORM_EDIT_ERRORS,
          payload: errors,
        })
      }
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.put(endpoint + `category/${category._id}`, {
        category: newCategory,
      })

      const successfulOptions = {
        title: `Update category`,
        message: "SuccessFully updated",
        position: "tr",
        autoDismiss: 1,
      }

      if (response) {
        dispatch(info(successfulOptions))
        dispatch(resetCategory())
        dispatch(goBack())
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// activate category api
export const activateCategory = (id, value) => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.put(endpoint + `category/${id}/active`, {
        category: {
          isActive: value,
        },
      })
      console.log(response.data)
      const successfulOptions = {
        title: `Activated category`,
        position: "tr",
        autoDismiss: 1,
      }

      if (response.data) {
        dispatch(success(successfulOptions))
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// delete category api
export const deleteCategory = (id) => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.delete(endpoint + `category/${id}`)

      const successfulOptions = {
        title: `Delete category`,
        message: "SuccessFully deleted",
        position: "tr",
        autoDismiss: 1,
      }
      if (response) {
        dispatch(warning(successfulOptions))
        dispatch({
          type: REMOVE_CATEGORY,
          payload: id,
        })
        dispatch(goBack())
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}
