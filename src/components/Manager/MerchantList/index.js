/**
 *
 * MerchantList
 *
 */

import React from "react"
import styled from "styled-components"
import { formatDate } from "../../../helpers/date"
import Button from "../../Common/Button"
import { CheckIcon, RefreshIcon, TrashIcon } from "../../Common/Icon"

const MerchantList = (props) => {
  const { merchants, approveMerchant, rejectMerchant, deleteMerchant } = props

  return (
    <div className="merchant-list">
      {merchants.map((merchant, index) => (
        <div key={index} className="merchant-box">
          <div className="mb-3 p-4">
            <StyledText className="text-black">Business</StyledText>
            <StyledPTag className="fw-2 text-truncate">
              {merchant.business}
            </StyledPTag>
            <StyledText className="text-black">Brand</StyledText>
            <StyledPTag className="text-truncate">{merchant.brand}</StyledPTag>
            <StyledText className="text-black">Name</StyledText>
            <StyledPTag className="text-truncate">{merchant.name}</StyledPTag>
            <StyledText className="text-black">Email</StyledText>
            <StyledPTag className="text-truncate">
              {merchant.email ? merchant.email : "N/A"}
            </StyledPTag>
            <StyledText className="text-black">Phone Number</StyledText>
            <StyledPTag>{merchant.phoneNumber}</StyledPTag>
            <StyledText className="text-black">Request date</StyledText>
            <StyledPTag>{formatDate(merchant.createdAt)}</StyledPTag>

            <hr />

            {merchant.status === "Approved" ? (
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0">
                <div className="d-flex flex-row mx-0">
                  <CheckIcon className="text-green" />
                  <p className="ml-2 mb-0">Approved</p>
                </div>

                <Button
                  className="mt-3 mt-lg-0"
                  text="Delete"
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteMerchant(merchant._id)}
                />
              </div>
            ) : merchant.status === "Rejected" ? (
              <>
                <div className="d-flex align-items-center mb-3">
                  <RefreshIcon className="text-primary" />
                  <p className="fw-2 ml-3 mb-0">Re Approve Merchant</p>
                </div>
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0">
                  <Button
                    className="text-uppercase"
                    variant="primary"
                    size="md"
                    text="Approve"
                    onClick={() => approveMerchant(merchant)}
                  />
                  <Button
                    className="mt-3 mt-lg-0"
                    text="Delete"
                    icon={<TrashIcon width={15} />}
                    onClick={() => deleteMerchant(merchant._id)}
                  />
                </div>
              </>
            ) : merchant.email ? (
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0">
                <div className="d-flex flex-column flex-lg-row mx-0">
                  <Button
                    variant="dark"
                    className="text-uppercase"
                    size="md"
                    text="Approve"
                    onClick={() => approveMerchant(merchant)}
                  />
                  <Button
                    variant="danger"
                    className="mt-3 mt-lg-0 ml-lg-2 text-uppercase"
                    size="md"
                    text="Reject"
                    onClick={() => rejectMerchant(merchant)}
                  />
                </div>
                <Button
                  className="mt-3 mt-lg-0"
                  text="Delete"
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteMerchant(merchant._id)}
                />
              </div>
            ) : (
              <>
                <StyledPTag className="text-truncate">
                  Merchant doesn't have email. Call at
                  <a
                    href={`tel:${merchant.phoneNumber}`}
                    className="text-primary"
                  >
                    {" "}
                    {merchant.phoneNumber}
                  </a>
                </StyledPTag>
                <Button
                  className="w-100 w-lg-auto"
                  text="Delete"
                  icon={<TrashIcon width={15} />}
                  onClick={() => deleteMerchant(merchant._id)}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MerchantList
const StyledText = styled.label`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
