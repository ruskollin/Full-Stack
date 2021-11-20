const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.filter
      default:
        return state
    }
  }
  
  export const setSearchTerm = (filter) => {
    return {
      type: 'SET_FILTER',
      filter
    }
  }
  
  export default filterReducer