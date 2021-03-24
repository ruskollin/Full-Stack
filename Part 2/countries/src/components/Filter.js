import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
    return (
        <div
            style= {{
                fontSize: 30
            }}>
        Find countries: &nbsp;
        <input
            style= {{
                fontSize: 20
            }}
            value={filter}
            onChange={onFilterChange} /> 
      </div>
    )
  }

  export default Filter;