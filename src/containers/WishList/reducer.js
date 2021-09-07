/*
 *
 * WishList reducer
 *
 */

import {
  FETCH_WISHLIST,
  REMOVE_WISHLIST,
  SET_WISHLIST_LOADING,
  WISHLIST_CHANGE,
} from "./constants"

const initialState = {
  wishlist: [],
  isLoading: false,
  wishlistForm: {},
}

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      }
    case REMOVE_WISHLIST:
      const index = state.wishlist.findIndex((r) => r._id === action.payload)
      return {
        ...state,
        wishlist: [
          ...state.wishlist.slice(0, index),
          ...state.wishlist.slice(index + 1),
        ],
      }
    case SET_WISHLIST_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case WISHLIST_CHANGE:
      return {
        ...state,
        wishlistForm: {
          ...state.wishlistForm,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

export default wishListReducer
