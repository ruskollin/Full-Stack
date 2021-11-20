import React from 'react'
import { connect } from 'react-redux'
import {setSearchTerm} from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setSearchTerm(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, {setSearchTerm})(Filter)