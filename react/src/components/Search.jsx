import React, { useState, useEffect } from 'react';
import Record from './Record';
import {useParams} from 'react-router-dom'

const Search = (props) => {
    const {term} = useParams();
    const [recordData, setRecords] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/search?q=${term}`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setRecords(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
        <h3>Search Results: {term} </h3>
        <form className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {recordData.map((record) => (
                <Record key={record._id} recordData={record} />
              ))}      
        </form>
        </>
    );
};

export default Search;