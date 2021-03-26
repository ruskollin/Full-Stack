import React from 'react';
import '../index.css'

const Filter = ({ filter, onFilterChange}) => {
    return (
        <div className='filter'>
        Search: {' '}
            <input
                value={filter}
                onChange={onFilterChange}
            /> 
      </div>
    )
  }

  export default Filter;