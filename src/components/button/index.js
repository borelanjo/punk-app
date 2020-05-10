import React from 'react'
import './button.css'

const Button = ({ children, variant, size, ...props}) => (
  <button className={
    "btn" 
    + (variant === 'primary' ? ' btn-primary' : '')
    + (size === 'small' ? ' btn-small' : '')
    }
    {...props}
  >
    {children}
  </button> 
)

export default Button