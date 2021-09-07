/*
 *
 * WishList actions
 *
 */

// import { success, warning, info } from 'react-notification-system-redux';
import { fetchStoreProducts } from "../Product/actions"
import axios from "axios"

import {
  REMOVE_WISHLIST,
  FETCH_WISHLIST,
  SET_WISHLIST_LOADING,
  WISHLIST_CHANGE,
} from "./constants"
import handleError from "../../utils/error"

export const updateWishlist = (e) => {
  return async (dispatch, getState) => {
    try {
      if (getState().authentication.authenticated == true) {
        const wishlistForm = {
          value: e.target.checked,
          name: e.target.name,
          id: e.target.id,
        }

        dispatch({ type: WISHLIST_CHANGE, payload: wishlistForm })
        const wishlist = await getState().wishlist.wishlistForm

        const newWishlist = {
          product: wishlist.name,
        }
        let endpoint = process.env.REACT_APP_BACKEND_URL
        const response = await axios.post(endpoint + `/wishList`, newWishlist)

        // const successfulOptions = {
        //   title: `${response.data.message}`,
        //   position: 'tr',
        //   autoDismiss: 1
        // };

        if (response.data) {
          // dispatch(success(successfulOptions));
          dispatch(fetchWishlist())
        }
      } else {
        const retryOptions = {
          title: `Please login to wishlist a product`,
          position: "tr",
          autoDismiss: 1,
        }
        // dispatch(warning(retryOptions));
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}
export const deleteWishlist = (id) => {
  return async (dispatch) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      const response = await axios.delete(endpoint + `/wishList/${id}`)

      // const successfulOptions = {
      //   title: `${response.data.message}`,
      //   position: 'tr',
      //   autoDismiss: 1
      // };

      if (response.data) {
        // dispatch(success(successfulOptions));
        dispatch({
          type: REMOVE_WISHLIST,
          payload: id,
        })
      }
    } catch (error) {
      handleError(error, dispatch)
    }
  }
}

// fetch wishlist api
export const fetchWishlist = () => {
  return async (dispatch, getState) => {
    try {
      let endpoint = process.env.REACT_APP_BACKEND_URL
      dispatch({ type: SET_WISHLIST_LOADING, payload: true })

      const response = await axios.get(endpoint + `/wishList`)
      console.log(response)
      dispatch({ type: FETCH_WISHLIST, payload: response.data })
    } catch (error) {
      handleError(error, dispatch)
    } finally {
      dispatch({ type: SET_WISHLIST_LOADING, payload: false })
    }
  }
}
