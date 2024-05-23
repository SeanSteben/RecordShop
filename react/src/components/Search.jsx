import React, { useState, useEffect } from 'react';
import Record from './Record';

const Search = (props) => {
    return (
        <>
        {/* <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search"
                placeholder="Search" aria-label="Search"
                value={searchTerm} onChange={handleChange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form> */}

        <h1>On search component</h1>
        <h2>{props.data}</h2>
        {/* <form className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {recordData.map((record) => (
                <Record key={record._id} recordData={record} />
              ))}
              
            </form>

        </>
        
    );
};

export default Search;