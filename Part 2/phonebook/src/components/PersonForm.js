import React from 'react'

const PersonForm = (props) => {
    return (
        <form 
          onSubmit={props.addPerson}
          style= {{
            padding: 10,
            width: 240
          }}>

          <div style= {{ marginBottom: 10 }}>
            Full Name: 
            <input
              value={props.newName}
              onChange={props.handlePersonChange} />
          </div>
          <div style = {{ marginBottom: 10 }}>
            Number: 
            <input
              value={props.newPhone}
              onChange={props.handlePhoneChange} />
          </div>

        <div style={{textAlign: 'center'}}>
          <button type="submit">ADD</button>
        </div>
      </form>
    )
}

export default PersonForm