/*
 *
 * OrderSuccess
 *
 */

import React from "react"
import Card from "../../components/Manager/AddCard"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import actions from "../../actions"

import NotFound from "../../components/Common/NotFound"
import LoadingIndicator from "../../components/Common/LoadingIndicator"

class OrderSuccess extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id
    console.log(id)
    this.props.fetchOrder(id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id
      this.props.fetchOrder(id)
    }
  }

  render() {
    const { order, isLoading } = this.props
    console.log(order)
    return (
      <div className="order-success">
        {isLoading ? (
          <LoadingIndicator />
        ) : order && order._id ? (
          <Card />
        ) : (
          <NotFound message="No order found." />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order.order,
    isLoading: state.order.isLoading,
  }
}

export default connect(mapStateToProps, actions)(OrderSuccess)

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
