/**
 *
 * ReviewList
 *
 */

import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"

import { formatDate } from "../../../helpers/date"
import { getRandomColors } from "../../../helpers"
import Button from "../../Common/Button"
import { CheckIcon, RefreshIcon, TrashIcon } from "../../Common/Icon"

const ReviewList = (props) => {
  const { reviews, approveReview, rejectReview, deleteReview } = props
  // console.log(reviews)
  const getAvatar = (review) => {
    const color = getRandomColors()
    if (review.user.firstName) {
      return (
        <div
          className="d-flex flex-column justify-content-center align-items-center fw-1 text-white avatar"
          style={{ backgroundColor: color ? color : "red" }}
        >
          {review.user.firstName.charAt(0)}
        </div>
      )
    }
  }

  const getProduct = (review) => {
    if (review.product) {
      const product = review.product
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            className="item-image"
            src={`${
              product.imageUrl
                ? product.imageUrl
                : "/images/placeholder-image.png"
            }`}
          />
        </div>
      )
    }
  }

  return (
    <div className="r-list">
      {reviews.map((review, index) => (
        <div key={index} className="review-box">
          <div className="mb-3 p-4">
            <div className="d-flex flex-row mx-0 mb-2 mb-lg-3 align-items-center justify-content-between">
              <div className="review-content">
                <div className="d-flex flex-row mx-0 mb-2 align-items-center justify-content-between">
                  <StyledPTag className="mb-0 fw-2 text-truncate">
                    {review.title}
                  </StyledPTag>
                  <div className="d-block d-lg-none">{getAvatar(review)}</div>
                </div>
                <StyledPTag className="mb-0 fw-2 word-break-all">
                  {review.review}
                </StyledPTag>
              </div>
              <div className="d-none d-lg-block">{getAvatar(review)}</div>
            </div>
            <div className="d-flex flex-column flex-lg-row mx-0 mb-3 align-items-start justify-content-between">
              <div className="w-100 mb-3 mb-lg-0 review-product-box">
                <Link
                  to={`/product/${review?.product?.slug}`}
                  className="default-link"
                >
                  {review?.product?.name}
                </Link>
                <ReactStars
                  classNames="mt-1 mt-lg-2"
                  size={16}
                  edit={false}
                  color={"#adb5bd"}
                  activeColor={"#ffb302"}
                  a11y={true}
                  isHalf={true}
                  emptyIcon={<i className="fa fa-star" />}
                  halfIcon={<i className="fa fa-star-half-alt" />}
                  filledIcon={<i className="fa fa-star" />}
                  value={review.rating}
                />
              </div>
              {getProduct(review)}
            </div>
            <StyledLabel className="text-black">{`Review Added on ${`${formatDate(
              review.createdAt
            )}`}`}</StyledLabel>
            <hr />

            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center mx-0">
              <StyledButton
                className="mt-3 mt-lg-0"
                text="Delete"
                icon={<TrashIcon width={15} />}
                onClick={() => deleteReview(review._id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReviewList
const StyledText = styled.h4`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
const StyledLabel = styled.label`
  color: chocolate !important;
`
const StyledButton = styled(Button)`
  background-color: red !important;
  border-radius: 50px !important;
  border: 1px solid orangered;
`
