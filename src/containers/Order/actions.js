/*
 *
 * Order actions
 *
 */

import { push } from "connected-react-router"
import axios from "axios"
// import { success } from 'react-notification-system-redux';

import {
  FETCH_ORDERS,
  FETCH_SEARCHED_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER_STATUS,
  SET_ORDERS_LOADING,
  CLEAR_ORDERS,
} from "./constants"

import { clearCart, getCartId } from "../Cart/actions"
import { toggleCart } from "../Navigation/actions"
import handleError from "../../utils/error"

export const updateOrderStatus = (value) => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: value,
  }
}

export const setOrderLoading = (value) => {
  return {
    type: SET_ORDERS_LOADING,
    payload: value,
  }
}

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true))
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `order`)
      console.log(response)
      if (response.data) {
        dispatch({
          type: FETCH_ORDERS,
          payload: response.data.orders,
        })
      }
    } catch (error) {
      dispatch(clearOrders())
      handleError(error, dispatch)
    } finally {
      dispatch(setOrderLoading(false))
    }
  }
}

export const fetchSearchOrders = (filter) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true))
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `order/search`, {
        params: {
          search: filter.value,
        },
      })
      console.log(response)
      dispatch({ type: FETCH_SEARCHED_ORDERS, payload: response.data.orders })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch(setOrderLoading(false))
    }
  }
}

export const searchOrders = (filter) => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchSearchOrders(filter))
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

export const fetchOrder = (id, withLoading = true) => {
  return async (dispatch, getState) => {
    try {
      if (withLoading) {
        dispatch(setOrderLoading(true))
      }
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.get(endpoint + `order/${id}`)
      console.log(response)
      dispatch({
        type: FETCH_ORDER,
        payload: response.data.order,
      })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      if (withLoading) {
        dispatch(setOrderLoading(false))
      }
    }
  }
}

export const cancelOrder = () => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order
      let endpoint = process.env.REACT_APP_BACKEND_URL
      await axios.delete(endpoint + `order/cancel/${order._id}`)

      dispatch(push(`/dashboard/orders`))
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

export const updateOrderItemStatus = (itemId, status) => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.put(
        endpoint + `order/status/item/${itemId}`,
        {
          orderId: order._id,
          cartId: order.cartId,
          status,
        }
      )
      // console.log(response)
      if (response.data) {
        dispatch(push(`/dashboard/orders`))
      } else {
        dispatch(updateOrderStatus({ itemId, status }))
        dispatch(fetchOrder(order._id, false))
      }

      // const successfulOptions = {
      //   title: `${response.data.message}`,
      //   position: 'tr',
      //   autoDismiss: 1
      // };

      // dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

export const addOrder = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem("cart_id")
      const total = getState().cart.cartTotal

      if (cartId) {
        let endpoint = process.env.REACT_APP_BACKEND_URL
        const response = await axios.post(endpoint + `order/add`, {
          cartId,
          total,
        })
        // console.log(response)
        dispatch(push(`/order/success/${response.data._id}`))
        dispatch(clearCart())
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

export const placeOrder = () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem("token")

    const cartItems = getState().cart.cartItems

    if (token && cartItems.length > 0) {
      Promise.all([dispatch(getCartId())]).then(() => {
        dispatch(addOrder())
      })
    }

    dispatch(toggleCart())
  }
}

export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS,
  }
}
