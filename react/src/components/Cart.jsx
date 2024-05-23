import React, { useState, useEffect } from "react"

const Cart = () => {
    const [cart, setCart] = useState({ items: [] })

    return (
        <>
            
            <h1>Cart</h1>
            <ul>{cart.items.map(cartItem => (
                <li key={cartItem._id}>
                    {cartItem.album_name} by {cartItem.band_name}
                    {/* might need to be tweeked */}
                </li>
            ))}
            </ul>
            <button className="btn btn-outline-success" type="submit" > Checkout</button>


        </>

    );
};
export default Cart;