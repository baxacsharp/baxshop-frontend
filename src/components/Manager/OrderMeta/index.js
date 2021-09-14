/**
 *
 * OrderMeta
 *
 */

import React from "react"

import { Row, Col } from "reactstrap"
import styled from "styled-components"
import { formatDate } from "../../../helpers/date"
import Button from "../../Common/Button"
import { ArrowBackIcon } from "../../Common/Icon"

const OrderMeta = (props) => {
  const { order, cancelOrder, onBack } = props

  const renderMetaAction = () => {
    const isNotDelivered =
      order.products.filter((i) => i.status === "Delivered").length < 1

    if (isNotDelivered) {
      return <Button size="sm" text="Cancel Order" onClick={cancelOrder} />
    }
  }

  return (
    <div className="order-meta">
      <div className="d-flex align-items-center justify-content-between mb-3 title">
        <StyledH className="mb-0">Order Details</StyledH>
        <Button
          variant="link"
          icon={<ArrowBackIcon />}
          size="sm"
          text="Back to orders"
          onClick={onBack}
        ></Button>
      </div>

      <Row>
        <Col xs="12" md="8">
          <Row>
            <Col xs="4">
              <StyledPTag className="one-line-ellipsis">Order ID</StyledPTag>
            </Col>
            <Col xs="8">
              <StyledSpan className="order-label one-line-ellipsis">{` ${order._id}`}</StyledSpan>
            </Col>
          </Row>
          <Row>
            <Col xs="4">
              <StyledPTag className="one-line-ellipsis">Order Date</StyledPTag>
            </Col>
            <Col xs="8">
              <StyledSpan className="order-label one-line-ellipsis">{` ${formatDate(
                order.created
              )}`}</StyledSpan>
            </Col>
          </Row>
        </Col>
        <Col xs="12" md="4" className="text-left text-md-right">
          {renderMetaAction()}
        </Col>
      </Row>
    </div>
  )
}

export default OrderMeta
const StyledText = styled.h4`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
const StyledH = styled.h2`
  color: hotpink !important;
`
const StyledSpan = styled.span`
  color: ivory !important;
`
