/**
 *
 * SubPage
 *
 */

import React from "react"
import styled from "styled-components"
import Button from "../../Common/Button"

const SubPage = (props) => {
  const { title, actionTitle, handleAction, children } = props

  return (
    <div className="sub-page">
      <div className="subpage-header">
        <StyledText>{title}</StyledText>
        {actionTitle && (
          <div className="action">
            <StyledButton
              variant="none"
              size="sm"
              text={actionTitle}
              onClick={handleAction}
            />
          </div>
        )}
      </div>
      <div className="subpage-body">{children}</div>
    </div>
  )
}

export default SubPage
const StyledButton = styled(Button)`
  background-color: aquamarine !important;
`
const StyledText = styled.h2`
  color: rosybrown !important;
`
