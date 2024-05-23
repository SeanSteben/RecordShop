import React, { useState } from 'react';

const CheckoutForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = <a href="https://urldefense.com/v3/__http://e.target__;!!NT4GcUJTZV9haA!qoo-cwS4tb35uUVAevDuLxQ_tgm8QqHkzWYvskJ1CjPvincEqX75AVRNxTmWd1PE9wF3GijzG5kPAKKSUqg$">e.target</a>;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to backend
        console.log('Form data submitted:', formData);
    };

    return (
        <div>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <h2>User Information</h2>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <h2>Shipping Information</h2>
                <div>
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div>
                    <label>City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div>
                    <label>State:</label>
                    <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div>
                    <label>Zip Code:</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
                </div>

                <h2>Payment Information</h2>
                <div>
                    <label>Card Number:</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                </div>
                <div>
                    <label>Expiration Date:</label>
                    <input type="text" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required />
                </div>
                <div>
                    <label>CVV:</label>
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CheckoutForm;
