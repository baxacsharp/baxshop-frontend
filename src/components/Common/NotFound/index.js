/**
 *
 * NotFound
 *
 */

import React from "react"
import styled from "styled-components"
const NotFound = (props) => {
  const { message, className, children } = props
  return (
    <StyledNotFound className={`not-found ${className}`}>
      {message ? message : children}
    </StyledNotFound>
  )
}

NotFound.defaultProps = {
  className: "",
}
const StyledNotFound = styled.div`
  color: white !important;
`
export default NotFound
