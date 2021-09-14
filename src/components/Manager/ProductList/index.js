/**
 *
 * ProductList
 *
 */

import React from "react"

import { Link } from "react-router-dom"
import styled from "styled-components"
const ProductList = (props) => {
  const { products } = props

  return (
    <div className="p-list">
      {products.map((product, index) => (
        <Link
          to={`/dashboard/product/edit/${product._id}`}
          key={index}
          className="d-flex flex-row align-items-center mx-0 mb-3 product-box"
        >
          <img
            className="item-image"
            src={`${
              product && product.imageUrl
                ? product.imageUrl
                : "/images/placeholder-image.png"
            }`}
          />
          <div className="d-flex flex-column justify-content-center px-3 text-truncate">
            <StyledText className="text-truncate">{product.name}</StyledText>
            <StyledPTag className="mb-2 text-truncate">
              {product.description}
            </StyledPTag>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductList
const StyledText = styled.h4`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
