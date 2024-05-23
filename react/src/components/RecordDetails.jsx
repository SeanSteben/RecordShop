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
    const addToCart = (itemId) => {
        fetch(`http://localhost:3000/cart/add`, {
            method: "POST",
            body: JSON.stringify({ itemId }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
               
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });


    }

    return (
        <div>
            <h1 id="name">{record.album_name}</h1>
            <h4 id ="band"> Artist: {record.band_name}</h4>
            <h4 id ="genre"> Genre: {record.genre}</h4>
            <h4 id ="release_date"> Release Date: {record.release_date}</h4>
            <h4 id ="record_label"> Record Label: {record.record_label}</h4>
            <h4 id ="album_length"> Album length: {record.duration}</h4>
            <h3 id = "price">${record.price}</h3>
            <button className="btn btn-outline-success" type="submit" onClick = {() => addToCart(record._id)}> Add to Cart</button>
            

            

            

        </div>
    )
}