import React, { useState, useEffect } from 'react';
import Record from './Record';

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recordData, setRecordData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/records');
            if (!response.ok) {
            throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            setRecordData(json_response); // assign JSON response to the data variable.

        } catch (error) {
            console.error('Error fetching records:', error);
        }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/search?q=${searchTerm}`, {
            method: "POST",
            body: JSON.stringify({ searchTerm }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                setRecordData(data);
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
    };

    return (
        <>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search"
                placeholder="Search" aria-label="Search"
                value={searchTerm} onChange={handleChange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        <form className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {recordData.map((record) => (
                <Record key={record._id} recordData={record} />
              ))}
              
            </form>

        </>
        
    );
};

export default Search;