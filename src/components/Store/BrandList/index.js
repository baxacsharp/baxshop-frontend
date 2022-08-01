/**
 *
 * BrandList
 *
 */

import React from "react"

import { Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import styled from "styled-components"
const BrandList = (props) => {
  const { brands } = props

  return (
    <div className="brand-list">
      <StyledH>Shop By Brand</StyledH>
      <hr />
      <Row className="flex-sm-row">
        {brands.map((brand, index) => (
          <Col xs="6" md="4" lg="3" key={index} className="mb-3 px-2">
            <div className="brand-box">
              <Link to={`/shop/brand/${brand.slug}`} className="d-block">
                <h4 style={{ color: "sienna" }}>{brand.name}</h4>
                <p style={{ color: "white" }} className="brand-desc">
                  {brand.description}
                </p>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}
const StyledH = styled.h2`
  color: sienna;
`
export default BrandList
