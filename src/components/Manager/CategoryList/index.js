/**
 *
 * CategoryList
 *
 */

import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const CategoryList = (props) => {
  const { categories } = props

  return (
    <div className="c-list">
      {categories &&
        categories.map((category, index) => (
          <Link
            to={`/dashboard/category/edit/${category._id}`}
            key={index}
            className="d-block mb-3 p-4 category-box"
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <StyledText className="mb-0">{category.name}</StyledText>
            </div>
            <StyledPTag className="mb-2 category-desc">
              {category.description}
            </StyledPTag>
          </Link>
        ))}
    </div>
  )
}

export default CategoryList
const StyledText = styled.h4`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
