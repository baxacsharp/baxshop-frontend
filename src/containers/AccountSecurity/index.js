/*
 *
 * AccountSecurity
 *
 */

import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import actions from "../../actions"

import SubPage from "../../components/Manager/SubPage"
import ResetPasswordForm from "../../components/Common/ResetPasswordForm"

class AccountSecurity extends React.PureComponent {
  componentDidMount() {}

  render() {
    const {
      resetFormData,
      formErrors,
      resetPasswordChange,
      resetAccountPassword,
    } = this.props

    return (
      <div className="account-security">
        <SubPage title={"Account Security"} isMenuOpen={null}>
          <div className="reset-form">
            <StyledH>Reset Password</StyledH>
            <ResetPasswordForm
              resetFormData={resetFormData}
              formErrors={formErrors}
              resetPasswordChange={resetPasswordChange}
              resetPassowrd={resetAccountPassword}
            />
          </div>
        </SubPage>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.account.user,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors,
  }
}

export default connect(mapStateToProps, actions)(AccountSecurity)

const StyledH = styled.h3`
  color: rosybrown !important;
`
