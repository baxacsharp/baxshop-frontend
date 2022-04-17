/*
 *
 * Product actions
 *
 */

import { goBack } from "connected-react-router"
import { success, warning, info } from "react-notification-system-redux"
import axios from "axios"

import {
  FETCH_PRODUCTS,
  FETCH_STORE_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_STORE_PRODUCT,
  PRODUCT_CHANGE,
  PRODUCT_EDIT_CHANGE,
  PRODUCT_SHOP_CHANGE,
  SET_PRODUCT_FORM_ERRORS,
  SET_PRODUCT_FORM_EDIT_ERRORS,
  RESET_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  FETCH_PRODUCTS_SELECT,
  SET_PRODUCTS_LOADING,
  SET_ADVANCED_FILTERS,
  RESET_ADVANCED_FILTERS,
} from "./constants"

import handleError from "../../utils/error"
import {
  formatSelectOptions,
  unformatSelectOptions,
} from "../../helpers/select"
import { allFieldsValidation } from "../../utils/validation"

export const productChange = (name, value) => {
  let formData = {}
  formData[name] = value
  return {
    type: PRODUCT_CHANGE,
    payload: formData,
  }
}

export const productEditChange = (name, value) => {
  let formData = {}
  formData[name] = value

  return {
    type: PRODUCT_EDIT_CHANGE,
    payload: formData,
  }
}

export const productShopChange = (name, value) => {
  let formData = {}
  formData[name] = value

  return {
    type: PRODUCT_SHOP_CHANGE,
    payload: formData,
  }
}

export const resetProduct = () => {
  return async (dispatch, getState) => {
    dispatch({ type: RESET_PRODUCT })
  }
}

// fetch store products by filterProducts api
export const filterProducts = (n, v) => {
  return async (dispatch, getState) => {
    try {
      const s = getState().product.advancedFilters
      const payload = productsFilterOrganizer(n, v, s)
      dispatch({ type: SET_ADVANCED_FILTERS, payload: payload })
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true })
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post(
        endpoint + `products/advancedFilters`,
        payload
      )
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(payload, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalProducts: response.data.totalProducts,
        }),
      })
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data,
      })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false })
    }
  }
}

// fetch products api
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true })
      const response = await axios.get(endpoint + `products`)
      // console.log(response)
      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products,
      })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false })
    }
  }
}

// fetch store products api
export const fetchStoreProducts = () => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true })
      const response = await axios.get(endpoint + `products/list`)
      const s = getState().product.advancedFilters
      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: Object.assign(s, {
          pages: response.data.pages,
          pageNumber: response.data.page,
          totalProducts: response.data.totalProducts,
        }),
      })
      dispatch({
        type: FETCH_STORE_PRODUCTS,
        payload: response.data,
      })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false })
    }
  }
}

// fetch product api
export const fetchProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `products/${id}`)
      // console.log(response)
      const inventory = response.data.product.quantity
      if (response.data.product.brand) {
        response.data.product.brand = formatSelectOptions([
          response.data.product.brand,
        ])[0]
      }

      const product = { ...response.data.product, inventory }

      dispatch({
        type: FETCH_PRODUCT,
        payload: product,
      })
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// fetch store product api
export const fetchStoreProduct = (slug) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true })

    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `products/item/${slug}`)
      // console.log(response)
      const inventory = response.data.product.quantity
      const product = { ...response.data, inventory }

      dispatch({
        type: FETCH_STORE_PRODUCT,
        payload: product,
      })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false })
    }
  }
}

export const fetchBrandProducts = (slug) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true })

    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `products/list/brand/${slug}`)
      console.log(response)
      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products,
      })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false })
    }
  }
}

export const fetchCategoryProducts = (slug) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_PRODUCTS_LOADING, payload: true })

    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(
        endpoint + `products/list/category/${slug}`
      )
      // console.log(response)
      dispatch({
        type: FETCH_PRODUCTS,
        payload: response.data.products,
      })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false })
    }
  }
}

export const fetchProductsSelect = () => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `products/list/select`)
      console.log(response)
      const formattedProducts = formatSelectOptions(response.data.products)

      dispatch({
        type: FETCH_PRODUCTS_SELECT,
        payload: formattedProducts,
      })
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// add product api
export const addProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        sku: "required",
        name: "required",
        description: "required|max:200",
        quantity: "required|numeric",
        price: "required|numeric",
        taxable: "required",
        brand: "required",
      }

      const product = getState().product.productFormData
      const user = getState().account.user
      const brands = getState().brand.brandsSelect
      const brand = unformatSelectOptions([product.brand])

      const newProduct = {
        sku: product.sku,
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
        isActive: product.isActive,
        taxable: product.taxable.value,
        brand:
          user.role !== "ROLE_MERCHANT"
            ? brand != 0
              ? brand
              : null
            : brands[1].value,
      }

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        "required.sku": "Sku is required.",
        "required.name": "Name is required.",
        "required.description": "Description is required.",
        "max.description":
          "Description may not be greater than 200 characters.",
        "required.quantity": "Quantity is required.",
        "required.price": "Price is required.",
        "required.taxable": "Taxable is required.",
        "required.brand": "Brand is required.",
      })

      if (!isValid) {
        return dispatch({ type: SET_PRODUCT_FORM_ERRORS, payload: errors })
      }

      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post(endpoint + `products/add`, newProduct)
      // console.log(response)
      let formData = new FormData()
      formData.append("image", product.image)
      await axios.post(
        endpoint + `products/${response.data.product._id}/image`,
        formData
      )

      const successfulOptions = {
        title: `Add product`,
        message: "SuccessFully added",
        position: "tr",
        autoDismiss: 1,
      }

      if (response.data) {
        dispatch(success(successfulOptions))
        dispatch({
          type: ADD_PRODUCT,
          payload: response.data,
        })
        dispatch(resetProduct())
        dispatch(goBack())
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// update Product api
export const updateProduct = () => {
  return async (dispatch, getState) => {
    try {
      const rules = {
        name: "required",
        description: "required|max:200",
        quantity: "required|numeric",
        price: "required|numeric",
        taxable: "required",
        brand: "required",
      }

      const product = getState().product.product

      const brand = unformatSelectOptions([product.brand])

      const newProduct = {
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        taxable: product.taxable,
        brand: brand != 0 ? brand : null,
      }

      const { isValid, errors } = allFieldsValidation(newProduct, rules, {
        "required.name": "Name is required.",
        "required.description": "Description is required.",
        "max.description":
          "Description may not be greater than 200 characters.",
        "required.quantity": "Quantity is required.",
        "required.price": "Price is required.",
        "required.taxable": "Taxable is required.",
        "required.brand": "Brand is required.",
      })

      if (!isValid) {
        return dispatch({
          type: SET_PRODUCT_FORM_EDIT_ERRORS,
          payload: errors,
        })
      }
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.put(endpoint + `products/${product._id}`, {
        product: newProduct,
      })

      const successfulOptions = {
        title: `Update product`,
        message: "SuccessFully updated",
        position: "tr",
        autoDismiss: 1,
      }

      if (response.data) {
        dispatch(success(successfulOptions))
        dispatch(goBack())
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// activate product api
export const activateProduct = (id, value) => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.put(endpoint + `products/${id}/active`, {
        product: {
          isActive: value,
        },
      })

      const successfulOptions = {
        title: `Activated`,
        position: "tr",
        autoDismiss: 1,
      }

      if (response) {
        dispatch(success(successfulOptions))
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// delete product api
export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.delete(endpoint + `products/delete/${id}`)

      const successfulOptions = {
        title: `Delete product`,
        message: "SuccessFully deleted",
        position: "tr",
        autoDismiss: 1,
      }

      if (response.data) {
        dispatch(success(successfulOptions))
        dispatch({
          type: REMOVE_PRODUCT,
          payload: id,
        })
        dispatch(goBack())
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

const productsFilterOrganizer = (n, v, s) => {
  switch (n) {
    case "sorting":
      return {
        name: "all",
        category: "all",
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: v,
        pageNumber: s.pageNumber,
      }
      break
    case "price":
      return {
        name: "all",
        category: "all",
        min: v[0],
        max: v[1],
        rating: s.rating,
        order: s.order,
        pageNumber: s.pageNumber,
      }
      break
    case "rating":
      return {
        name: "all",
        category: "all",
        min: s.min,
        max: s.max,
        rating: v,
        order: s.order,
        pageNumber: s.pageNumber,
      }
      break
    case "pagination":
      return {
        name: "all",
        category: "all",
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: v,
      }
      break
    default:
      return {
        name: "all",
        category: "all",
        min: s.min,
        max: s.max,
        rating: s.rating,
        order: s.order,
        pageNumber: s.pageNumber,
      }
      break
  }
}
