/**
 *
 * AddressList
 *
 */

import React from "react"

import { Link } from "react-router-dom"
import styled from "styled-components"
import { AddressIcon, CheckIcon } from "../../Common/Icon"

const AddressList = (props) => {
  const { addresses } = props

  return (
    <div className="a-list">
      {addresses.map((address, index) => (
        <Link
          to={`/dashboard/address/edit/${address._id}`}
          key={index}
          className="d-block"
        >
          <styledDiv className="d-flex align-items-center mb-3 address-box">
            <div className="mx-3">
              <AddressIcon />
            </div>
            <div className="flex-1 p-3 p-lg-4">
              {address.isDefault ? (
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h4 className="mb-0 mr-2 one-line-ellipsis">
                    Default Delivery Address
                  </h4>
                  <CheckIcon className="text-green" />
                </div>
              ) : (
                <StyledText className="mb-0">Delivery Address</StyledText>
              )}
              <StyledPTag className="mb-2 address-desc">
                {`${address?.address} ${address?.city}, ${address?.country}, ${address?.zipCode}`}
              </StyledPTag>
            </div>
          </styledDiv>
        </Link>
      ))}
    </div>
  )
}

export default AddressList
const StyledText = styled.h4`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
const styledDiv = styled.div`
  background-color: steelblue !important;
`
