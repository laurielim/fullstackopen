import React from "react"

import '../assets/Notification.css'

const Notification = ({ message, status }) => {
    const classes = `notification ${status}`
    return (
      <div className={classes}>
        {message}
      </div>
    )
  }

  export default Notification
