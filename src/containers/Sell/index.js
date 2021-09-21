/*
 *
 * Sell
 *
 */

import React from "react"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { Row, Col } from "reactstrap"

import actions from "../../actions"

import Input from "../../components/Common/Input"
import Button from "../../components/Common/Button"
import LoadingIndicator from "../../components/Common/LoadingIndicator"
import { zoomInUp } from "react-animations"

class Sell extends React.PureComponent {
  render() {
    const {
      sellFormData,
      formErrors,
      sellFormChange,
      sellWithUs,
      isSubmitting,
      isLoading,
    } = this.props

    const handleSubmit = (event) => {
      event.preventDefault()
      sellWithUs()
    }

    return (
      <StyledHead className="sell">
        {isLoading && <LoadingIndicator />}
        <h2 style={{ color: "sienna" }}>Become A MERN Store Seller!</h2>
        <hr />
        <Row>
          <StyledCol xs="12" md="6" className="order-2 order-md-1">
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs="12">
                  <Input
                    type={"text"}
                    error={formErrors["name"]}
                    label={"Name"}
                    name={"name"}
                    placeholder={"You Full Name"}
                    value={sellFormData.name}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value)
                    }}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    type={"text"}
                    error={formErrors["email"]}
                    label={"Email Address"}
                    name={"email"}
                    placeholder={"Your Email Address"}
                    value={sellFormData.email}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value)
                    }}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    type={"text"}
                    // error={formErrors['phoneNumber']}
                    label={"Phone Number"}
                    name={"phoneNumber"}
                    placeholder={"Your Phone Number"}
                    value={sellFormData.phoneNumber}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value)
                    }}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    type={"text"}
                    error={formErrors["brand"]}
                    label={"Brand"}
                    name={"brand"}
                    placeholder={"Your Business Brand"}
                    value={sellFormData.brand}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value)
                    }}
                  />
                </Col>
                <Col xs="12">
                  <Input
                    type={"textarea"}
                    error={formErrors["business"]}
                    label={"Business"}
                    name={"business"}
                    placeholder={"Please Describe Your Business"}
                    value={sellFormData.business}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value)
                    }}
                  />
                </Col>
              </Row>
              <hr />
              <div className="sell-actions">
                <Button type="submit" text="Submit" disabled={isSubmitting} />
              </div>
            </form>
          </StyledCol>
          <Col xs="12" md="6" className="order-1 order-md-2">
            <Row>
              <Col xs="12" className="order-2 order-md-1 text-md-center mb-3">
                <div className="agreement-banner-text">
                  <h3 style={{ color: "white" }}>
                    Would you like to sell your products on BaxShop!
                  </h3>
                  <h4 style={{ color: "white" }}>
                    Grow your business with BaxShop
                  </h4>
                  <b style={{ color: "wheat" }}>Apply Today</b>
                </div>
              </Col>

              <Col
                xs="12"
                className="order-1 order-md-2 text-center mb-3 mb-md-0"
              >
                <img
                  className="agreement-banner"
                  src={"/images/banners/agreement.svg"}
                  alt="agreement banner"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledHead>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sellFormData: state.merchant.sellFormData,
    formErrors: state.merchant.formErrors,
    isSubmitting: state.merchant.isSellSubmitting,
    isLoading: state.merchant.isSellLoading,
  }
}

export default connect(mapStateToProps, actions)(Sell)
const AnimatedCol = keyframes`${zoomInUp}`

const StyledHead = styled.div`
  & h2,
  h3,
  h4 {
    color: sienna !important;
  }
`

const StyledCol = styled(Col)`
  :hover {
    box-shadow: 0 0 10px white, 0 0 40px whitesmoke, 0 0 10px wheat !important;
  }
  animation: 2s ${AnimatedCol};
  background-color: #454545;
  border: 2px solid goldenrod;
`
