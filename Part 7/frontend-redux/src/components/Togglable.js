import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

const ButtonAddBlog = styled.div`
  background: #000;
  font-weight: 700;
  padding: 0;
  border-radius: 5px;
  width: 201px;
  margin-left: 20px;

  span {
    display: block;
    width: 200px;
    background: #9fe5f6;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 5px;
    transform: translate3d(-4px, -4px, 0);
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1);
    cursor: pointer;
    text-align: center;
  }


  &:hover span {
    transform: translate3d(-8px, -8px, 0);
  }
}
`

const Togglable = React.forwardRef((props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    //type.name = "AddBlog" LoginForm
  }

  return (
    <div style= {{ display: 'flex', justifyContent: 'center' }}>
      <div style={hideWhenVisible}>
        <ButtonAddBlog onClick={toggleVisibility}><span>{props.buttonLabel}</span></ButtonAddBlog>
      </div>
      <div style={showWhenVisible}>
        <div  style={{ background: '#9fe5f6', width: '400px', borderRadius: '10px', padding: '20px', marginLeft: '20px', border: '3px solid #000' }}>
          {props.children}
          {props.children.type.name === 'LoginForm' || props.children.type.name === 'D' ?
            <div style={{ display: 'flex' }}><Button onClick={toggleVisibility} variant="danger" style={{ marginTop: 10 }}>CANCEL</Button></div>
            : <div style={{ display: 'flex', justifyContent: 'center', marginRight: 31 }}><Button onClick={toggleVisibility} variant="danger" style={{ marginTop: 10 }}>CANCEL</Button></div> }
        </div>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable