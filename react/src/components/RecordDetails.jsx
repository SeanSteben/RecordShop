import React, { useState, useEffect } from "react";
import {
    useParams,
} from "react-router-dom";


export default function RecordDetails(props) {
    let { id } = useParams();
    const [record, setRecord] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/records/${id}`);
                if (!response.ok) {
                  throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setRecord(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching record:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 id="name">{record.album_name}</h1>
        </div>
    )
}