import React from 'react'

const Notification = ({ message, isSuccess=true, isError=false }) => {
  const successClass = isSuccess ? "success" : ""
  const errorClass = isError ? "error" : ""
  return (
    message && <div className={`message ${successClass} ${errorClass}`}>{message}</div>
  )
}

export default Notification