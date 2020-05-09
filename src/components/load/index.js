import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './load.css'

const Load = () => <div className="load"><FontAwesomeIcon icon={faSpinner} spin /></div>

export default Load