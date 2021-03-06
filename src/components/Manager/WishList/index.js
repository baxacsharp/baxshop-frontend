/**
 *
 * WishList
 *
 */

import React from "react"

import { Link } from "react-router-dom"
import styled from "styled-components"
import { formatDate } from "../../../helpers/date"
import Button from "../../Common/Button"
import { XIcon } from "../../Common/Icon"

const WishList = (props) => {
  const { wishlist, deleteWishlist } = props

  const getProductImage = (item) => {
    if (item.product) {
      const product = item.product
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            className="item-image"
            src={`${
              product.imageUrl
                ? product.imageUrl
                : "/images/placeholder-image.png"
            }`}
          />
        </div>
      )
    }
  }
  console.log(wishlist)
  return (
    <div className="w-list">
      {wishlist.map((item, index) => (
        <div
          key={index}
          className="d-flex flex-row align-items-center mx-0 mb-3 wishlist-box"
        >
          <Link
            to={`/product/${item.product._id}`}
            key={index}
            className="d-flex flex-1 align-items-center text-truncate"
          >
            {getProductImage(item)}
            <div className="d-flex flex-column justify-content-center px-3 text-truncate">
              <StyledText className="text-truncate">
                {item.product.name}
              </StyledText>
              <StyledPTag className="mb-2 price">
                ${item.product.price}
              </StyledPTag>
              <StyledLabel className="text-truncate">{`Wishlist Added on ${formatDate(
                item.createdAt
              )}`}</StyledLabel>
            </div>
          </Link>
          <div className="remove-wishlist-box">
            <Button
              borderless
              variant="danger"
              icon={<XIcon className="text-white" width={15} />}
              onClick={() => deleteWishlist(item._id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default WishList
const StyledText = styled.h4`
  color: powderblue !important;
  :focus {
    color: brown !important;
  }
`
const StyledPTag = styled.p`
  color: wheat !important;
`
const StyledLabel = styled.label`
  color: greenyellow !important;
`
