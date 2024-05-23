import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([])
    const [prediction, setPrediction] = useState(null);
    let total = 0.00
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/cart`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log(json_response);
                setCart(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        fetchData();
    }, []);

    const removeFromCart = (record) => {
        fetch(`http://localhost:3000/cart/delete`, {
            method: "DELETE",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response data
                console.log(data);
                setCart(data)
                total -= parseFloat(record.price);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    }
    const predict = async (record) =>{
        try{
            const response = await fetch('http://localhost:5000/api/predict' , {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(record),
            });
            if (!response.ok){
                throw new Error('Prediction request failed!!!')
            }
            const jsonResponse = await response.json();
            setPrediction(jsonResponse.prediction); //might have to be changed
        } catch(error){
            console.error('Something went WRONG:', error)
        }
    }

    return (
        <>
            <h2>Shopping Cart</h2>
            {/* <div>{cart.length == 0 ? <h3>Your shopping cart is empty! Start by adding records to your cart.</h3>}</div> */}
            <div className="list-group">
                {cart.map(cartItem => (
                    <div key={cartItem._id} className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{cartItem.album_name}</h5>
                            <button type="button" className="btn btn-outline-danger" onClick={() => removeFromCart(cartItem)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                                </svg>
                                Remove from cart
                            </button>                    
                        </div>
                        <p className="mb-1">Artist: {cartItem.band_name}</p>
                        <p className="mb-1">Genre: {cartItem.genre}</p>
                        <p className="mb-1">Price: {cartItem.price}</p>
                        <small className="text-muted">{cartItem.is_new ? "New release!" : ""}.</small>
                    </div>
                ))}
                {cart.forEach(cartItem => total += parseFloat(cartItem.price))}
                <div>Total Price: ${total.toFixed(2)}</div>
            </div>
            {prediction && (
                <div className = "alert alert-info">
                    Prediction: {prediction}
                </div>
            )}
            <Link to="/checkout">
                <button className="btn btn-outline-success" type="submit" >Proceed to Checkout</button>
            </Link>
        </>
    );
};
export default Cart;