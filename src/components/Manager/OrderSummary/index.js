/**
 *
 * OrderSummary
 *
 */

import React from "react"

import { Col } from "reactstrap"
import styled from "styled-components"
const OrderSummary = (props) => {
  const { order } = props

  return (
    <Col className="order-summary pt-3">
      <StyledH>Order Summary</StyledH>
      <div className="d-flex align-items-center summary-item">
        <StyledPTag className="summary-label">Subtotal: </StyledPTag>
        <StyledPTag className="summary-value ml-auto">
          ${order.total}
        </StyledPTag>
      </div>
      <div className="d-flex align-items-center summary-item">
        <StyledPTag className="summary-label">Est. Sales Tax</StyledPTag>
        <StyledPTag className="summary-value ml-auto">
          ${order.totalTax}
        </StyledPTag>
      </div>

      <div className="d-flex align-items-center summary-item">
        <StyledPTag className="summary-label">Shipping & Handling</StyledPTag>
        <StyledPTag className="summary-value ml-auto">$0</StyledPTag>
      </div>

      <hr />
      <div className="d-flex align-items-center summary-item">
        <StyledPTag className="summary-label">Total:</StyledPTag>
        <StyledPTag className="summary-value ml-auto">
          ${order.total}
        </StyledPTag>
      </div>
    </Col>
  )
}

export default OrderSummary
const StyledText = styled.h4`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
const StyledH = styled.h2`
  color: hotpink !important;
`
