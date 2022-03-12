import React from 'react'

const Footer = () => (
    <div style={{display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'rgb(87, 190, 215)',
      padding: '10px',
      height: '42px',
      alignItems: 'center'}}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.
  
      See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  )

export default Footer