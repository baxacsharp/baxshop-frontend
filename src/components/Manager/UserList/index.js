/**
 *
 * UserList
 *
 */

import React from "react"
import styled from "styled-components"
import { formatDate } from "../../../helpers/date"
import UserRole from "../UserRole"

const UserList = (props) => {
  const { users } = props
  console.log(users)
  return (
    <div className="u-list">
      <StyledPTag className="fw-1">{users.length} results</StyledPTag>
      {users.response.map((user, index) => (
        <div key={index} className="mt-3 px-4 py-3 user-box">
          <StyledLabel className="text-black">Name</StyledLabel>
          <StyledPTag className="fw-2">
            {user?.firstName ? `${user?.firstName} ${user?.lastName}` : "N/A"}
          </StyledPTag>
          <StyledLabel className="text-black">Email</StyledLabel>
          <StyledPTag>{user?.email}</StyledPTag>

          <StyledLabel className="text-black">Account Created</StyledLabel>
          <StyledPTag>{formatDate(user?.createdAt)}</StyledPTag>
          <StyledLabel className="text-black">Role</StyledLabel>
          <StyledPTag className="mb-0">
            <UserRole user={user} className="d-inline-block mt-2" />
          </StyledPTag>
        </div>
      ))}
    </div>
  )
}

export default UserList
const StyledText = styled.h4`
  color: powderblue !important;
`
const StyledPTag = styled.p`
  color: wheat !important;
`
const StyledLabel = styled.label`
  color: greenyellow !important;
`
