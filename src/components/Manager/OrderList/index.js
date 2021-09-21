/**
 *
 * OrderList
 *
 */

import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { formatDate } from "../../../helpers/date"

const OrderList = (props) => {
  const { orders } = props

  const renderFirstItem = (order) => {
    if (order.products) {
      const product = order.products[0].product
      return (
        <img
          className="item-image"
          src={`${
            product && product?.imageUrl
              ? product?.imageUrl
              : "/images/placeholder-image.png"
          }`}
        />
      )
    } else {
      return <img className="item-image" src="/images/placeholder-image.png" />
    }
  }

  return (
    <div className="order-list">
      {orders.map((order, index) => (
        <div key={index} className="order-box">
          <Link to={`/order/${order._id}`} className="d-block box-link">
            <div className="d-flex flex-column flex-lg-row mb-3">
              <div className="order-first-item p-lg-3">
                {renderFirstItem(order)}
              </div>
              <div className="d-flex flex-column flex-xl-row justify-content-between flex-1 ml-lg-2 mr-xl-4 p-3">
                <div className="order-details">
                  <div className="mb-1">
                    <StyledSpan>Status</StyledSpan>
                    {order?.products ? (
                      <StyledSpan className="order-label order-status">{` ${order?.products[0].status}`}</StyledSpan>
                    ) : (
                      <StyledSpan className="order-label order-status">{` Unavailable`}</StyledSpan>
                    )}
                  </div>
                  <div className="mb-1">
                    <StyledSpan>Order #</StyledSpan>
                    <StyledSpan className="order-label">{` ${order._id}`}</StyledSpan>
                  </div>
                  <div className="mb-1">
                    <StyledSpan>Ordered on</StyledSpan>
                    <StyledSpan className="order-label">{` ${formatDate(
                      order.created
                    )}`}</StyledSpan>
                  </div>
                  <div className="mb-1">
                    <StyledSpan>Order Total</StyledSpan>
                    <StyledSpan className="order-label">{` $${order?.products[0].totalPrice}`}</StyledSpan>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default OrderList
const StyledSpan = styled.span`
  background-color: honeydew !important;
`
