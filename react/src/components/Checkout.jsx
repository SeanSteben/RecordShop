import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Checkout = () => {
    const {total} = useParams();
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
        const { name, value } = e.target;
        // // const { name, value } = <a href="https://urldefense.com/v3/__http://e.target__;!!NT4GcUJTZV9haA!qoo-cwS4tb35uUVAevDuLxQ_tgm8QqHkzWYvskJ1CjPvincEqX75AVRNxTmWd1PE9wF3GijzG5kPAKKSUqg$">e.target</a>;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to backend
        const submission = {...formData};

        try { 
            const response = await fetch(`http://localhost:3000/cart/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submission),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            alert('Transaction has been saved to orders database!')
        } catch(err) { 
            console.log('Error: ', err)
        }
        console.log('Form data submitted:', formData);
    };

    return (
        <>
            <h2>Checkout</h2>

            <h3>Cart</h3>

            <form onSubmit={handleSubmit}>
            <h4 className="mb-3">User & Shipping Information</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" className="form-control" id="name" placeholder="" value={formData.name} required="" onChange={handleChange}/>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control" id="email" placeholder="you@example.com" value={formData.email} onChange={handleChange}/>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" className="form-control" id="address" placeholder="1234 Main St" required="" value={formData.address} onChange={handleChange}/>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <input type="text" name="state" className="form-control" id="state" placeholder="" required="" value={formData.state} onChange={handleChange}/>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" name="zip" className="form-control" id="zip" placeholder="" required="" value={formData.zip} onChange={handleChange}/>
              </div>
            </div>
            <hr className="mb-4"/>

            <h4 className="mb-3">Payment</h4>

              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input type="text" name="cardNumber" className="form-control" id="cc-number" placeholder="" required="" value={formData.cardNumber} onChange={handleChange}/>
              </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input type="text" name="expirationDate" className="form-control" id="cc-expiration" placeholder="" required="" value={formData.expirationDate} onChange={handleChange}/>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">CVV</label>
                <input type="password" name="cvv" className="form-control" id="cc-cvv" placeholder="" required="" value={formData.cvv} onChange={handleChange}/>
              </div>
            </div>
            <hr className="mb-4"/>
            <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm order</button>
          </form>
          <h3>Total: ${Number(total).toFixed(2)}</h3>
    </>
)}

export default Checkout;
