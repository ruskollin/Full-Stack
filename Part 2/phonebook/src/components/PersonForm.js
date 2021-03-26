import React from 'react'
import '../index.css'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson} className='formContainer'>
          <div className='formBody'>
            Full Name: {' '} 
            <input
              value={props.newName}
              onChange={props.handlePersonChange} />
          </div>
          <div className='formBody'>
            Number: {' '}
            <input
              value={props.newPhone}
              onChange={props.handlePhoneChange} />
          </div>

        <div>
          <button style={{ marginLeft: 150, marginBottom: 5, marginTop: 10, backgroundColor: 'green', color: 'white' }} type="submit"> 
            ADD 
          </button>
        </div>
      </form>
    )
}

export default PersonForm