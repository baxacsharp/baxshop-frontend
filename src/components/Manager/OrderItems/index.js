/**
 *
 * OrderItems
 *
 */

import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Row, Col, DropdownItem } from "reactstrap"

import Button from "../../Common/Button"
import DropdownConfirm from "../../Common/DropdownConfirm"

const OrderItems = (props) => {
  const { order, user, updateOrderItemStatus } = props

  const renderPopoverContent = (item) => {
    const statuses = [
      "Not processed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ]

    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        {statuses.map((s, i) => (
          <DropdownItem
            key={`${s}-${i}`}
            className={s === item?.status ? "active" : ""}
            onClick={() => updateOrderItemStatus(item._id, s)}
          >
            {s}
          </DropdownItem>
        ))}
      </div>
    )
  }

  const renderItemsAction = (item) => {
    const isAdmin = user.role === "ROLE_ADMIN"

    if (item.status === "Delivered") {
      return (
        <Link
          to={`/product/${item.product.slug}`}
          className="btn-link text-center py-2 fs-12"
          style={{ minWidth: 120 }}
        >
          Reivew Product
        </Link>
      )
    } else if (item.status !== "Cancelled") {
      if (!isAdmin) {
        return (
          <DropdownConfirm label="Cancel">
            <div className="d-flex flex-column align-items-center justify-content-center p-2">
              <p className="text-center mb-2">{`Are you sure you want to cancel ${item.product?.name}.`}</p>
              <Button
                variant="danger"
                id="CancelOrderItemPopover"
                size="sm"
                text="Confirm Cancel"
                role="menuitem"
                className="cancel-order-btn"
                onClick={() => updateOrderItemStatus(item._id, "Cancelled")}
              />
            </div>
          </DropdownConfirm>
        )
      } else {
        return (
          <DropdownConfirm
            label={item.product && item.status}
            className={isAdmin ? "admin" : ""}
          >
            {renderPopoverContent(item)}
          </DropdownConfirm>
        )
      }
    }
  }

  return (
    <div className="order-items pt-3">
      <StyledH>Order Items</StyledH>
      <Row>
        {order.products.map((item, index) => (
          <Col xs="12" key={index} className="item">
            <div className="order-item-box">
              <div className="d-flex justify-content-between flex-column flex-md-row">
                <div className="d-flex align-items-center box">
                  <img
                    className="item-image"
                    src={`${
                      item.product && item.product.imageUrl
                        ? item.product.imageUrl
                        : "/images/placeholder-image.png"
                    }`}
                  />
                  <div className="d-md-flex flex-1 align-items-start ml-4 item-box">
                    <div className="item-details">
                      {item.product ? (
                        <>
                          <Link
                            to={`/product/${item.product?.slug}`}
                            className="item-link"
                          >
                            <StyledText className="d-block item-name one-line-ellipsis">
                              {item.product?.name}
                            </StyledText>
                          </Link>
                          <div className="d-flex align-items-center justify-content-between">
                            <span className="price">
                              ${item.purchasePrice || item.product.price}
                            </span>
                          </div>
                        </>
                      ) : (
                        <StyledText>Not Available</StyledText>
                      )}
                    </div>
                    <div className="d-flex justify-content-between flex-wrap d-md-none mt-1">
                      <StyledPTag className="mb-1 mr-4">
                        Status
                        <span className="order-label order-status">{` ${item.status}`}</span>
                      </StyledPTag>
                      <StyledPTag className="mb-1 mr-4">
                        Quantity
                        <span className="order-label">{` ${item.quantity}`}</span>
                      </StyledPTag>
                      <StyledPTag>
                        Total Price
                        <span className="order-label">{` $${item.totalPrice}`}</span>
                      </StyledPTag>
                    </div>
                  </div>
                </div>

                <div className="d-none d-md-flex justify-content-between align-items-center box">
                  <div className="text-center">
                    <StyledPTag className="order-label order-status">{`${item.status}`}</StyledPTag>
                    <StyledPTag>Status</StyledPTag>
                  </div>

                  <div className="text-center">
                    <StyledPTag className="order-label">{` ${item.quantity}`}</StyledPTag>
                    <StyledPTag>Quantity</StyledPTag>
                  </div>

                  <div className="text-center">
                    <StyledPTag className="order-label">{` $${item.totalPrice}`}</StyledPTag>

                    <StyledPTag>Total Price</StyledPTag>
                  </div>
                </div>
              </div>
              {item.product && (
                <div className="text-right mt-2 mt-md-0">
                  {renderItemsAction(item)}
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default OrderItems
const StyledText = styled.h4`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
const StyledH = styled.h2`
  color: hotpink !important;
`
