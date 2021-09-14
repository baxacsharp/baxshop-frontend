/**
 *
 * BrandList
 *
 */

import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const BrandList = (props) => {
  const { brands, user } = props

  return (
    <div className="b-list">
      {brands.map((brand, index) => (
        <Link
          to={`/dashboard/brand/edit/${brand._id}`}
          key={index}
          className="d-block mb-3 p-4 brand-box"
        >
          <div className="d-flex align-items-center justify-content-between mb-2">
            <StyledText className="mb-0">{brand.name}</StyledText>
          </div>
          <StyledPTag className="brand-desc mb-2">
            {brand.description}
          </StyledPTag>
          {brand?.merchant && brand?.merchant?._id !== user?.merchant && (
            <div className="d-flex">
              <label>By</label>
              <p className="brand-merchant mb-0 ml-2 text-primary">
                {brand.merchant.name}
              </p>
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}

export default BrandList
const StyledText = styled.h4`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
