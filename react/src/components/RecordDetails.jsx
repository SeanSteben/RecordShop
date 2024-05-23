import React, { useState, useEffect } from "react";
import recordImage from '../assets/record.svg'
import {
    useParams,
    Link
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

    function addToCart() { 
        // implement logic for adding product to cart.
        alert('added to cart!');
    }

    return (
        <div className="card mb-3" style={{maxWidth: "1000px"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={recordImage} className="img-fluid" />
                </div>
                <div className="col-md-8">
                    <div class="card-body">
                        <h3 className="card-title" style={{textTransform: "uppercase"}}><strong>{record.album_name}</strong></h3>
                        <p className="card-text"><strong>{record.band_name}</strong></p>
                        <p className="card-text"><small className="text-muted">{record.release_date}</small></p>
                        <p className="card-text">Genre: {record.genre}</p>
                        <p className="card-text">Record Label: {record.record_label}</p>
                        <p className="card-text">Duration: {record.duration}</p>
                        <button className="btn btn-primary" onClick={addToCart}>Add to cart!</button> 
                        <h5>{record.price}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}