import React from 'react'

const UserInfo = (props) => {
  return (
    <div>
      <p>Display Name: {props.displayName}</p>
      <p>Email: {props.email}</p>
    </div>
  )
}

export default UserInfo;
