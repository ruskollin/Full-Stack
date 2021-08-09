// import React from 'react';
// import ReactDOM from 'react-dom'
// import { createStore } from 'redux'
// import reducer from './reducer'

// const store = createStore(reducer)

// const App = () => {
//   const good = () => {
//     store.dispatch({
//       type: 'GOOD'
//     })
//   }

//   return (
//     <div>
//       <button onClick={good}>good</button> 
//       <button>neutral</button> 
//       <button>bad</button>
//       <button>reset stats</button>
//       <div>good {store.getState().good}</div>
//       <div>neutral</div>
//       <div>bad</div>
//     </div>
//   )
// }

// const renderApp = () => {
//   ReactDOM.render(<App />, document.getElementById('root'))
// }

// renderApp()
// store.subscribe(renderApp)

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)