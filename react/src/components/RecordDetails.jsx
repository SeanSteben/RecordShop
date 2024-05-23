import React, { useState, useEffect } from "react";
import recordImage from '../assets/record.png'
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
    const addToCart = (record) => {
        fetch(`http://localhost:3000/cart/add`, {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                alert('Added to cart!');
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    }

    return (
        <div className="card shadow mb-3" style={{maxWidth: "800px", backgroundColor: "#f0f0f0"}}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={recordImage} className="img-fluid" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title" style={{textTransform: "uppercase"}}><strong>{record.album_name}</strong></h3>
                        <h4 className="card-text">{record.band_name}</h4>
                        <p className="card-text"><small className="text-muted">{record.release_date}</small></p>
                        <p className="card-text">Genre: {record.genre}</p>
                        <p className="card-text">Record Label: {record.record_label}</p>
                        <p className="card-text">Duration: {record.duration}</p>
                        <div className="d-flex">
                            <button className="btn btn-primary" onClick={() => addToCart(record)}>Add to cart!</button> 
                            <h5 style={{paddingLeft: "10px"}}>${record.price}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};