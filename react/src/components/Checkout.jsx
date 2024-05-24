import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Checkout = () => {
  const { total } = useParams();
  const [cart, setCart] = useState([])
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    const submission = { ...formData };

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
      alert('Transaction has been saved to orders database!')
    } catch (err) {
      console.log('Error: ', err)
    }
    console.log('Form data submitted:', formData);
  };

  return (
    <>
      <h2>Checkout</h2> 
      <div className="row g-5">
      <div className="col-md-7 col-lg-8">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-3">User & Shipping Information</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="form-control" id="name" placeholder="" value={formData.name} required="" onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" className="form-control" id="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input type="text" name="address" className="form-control" id="address" placeholder="1234 Main St" required="" value={formData.address} onChange={handleChange} />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="state">State</label>
              <input type="text" name="state" className="form-control" id="state" placeholder="" required="" value={formData.state} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="zip">Zip</label>
              <input type="text" name="zip" className="form-control" id="zip" placeholder="" required="" value={formData.zip} onChange={handleChange} />
            </div>
          </div>
          <hr className="mb-4" />

          <h4 className="mb-3">Payment</h4>

          <div className="col-md-6 mb-3">
            <label htmlFor="cc-number">Credit card number</label>
            <input type="text" name="cardNumber" className="form-control" id="cc-number" placeholder="" required="" value={formData.cardNumber} onChange={handleChange} />
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-expiration">Expiration</label>
              <input type="text" name="expirationDate" className="form-control" id="cc-expiration" placeholder="" required="" value={formData.expirationDate} onChange={handleChange} />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="cc-expiration">CVV</label>
              <input type="password" name="cvv" className="form-control" id="cc-cvv" placeholder="" required="" value={formData.cvv} onChange={handleChange} />
            </div>
          </div>
          <hr className="mb-4" />
          <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm order</button>
        </form>
      </div>
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Your cart</span>
          <span className="badge bg-primary rounded-pill">{cart.length}</span>
        </h4>
        <ul className="list-group mb-3">
          {cart.map(record => (
            <li key={record._id}className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{record.album_name}</h6>
                <small className="text-muted">Artist: {record.band_name}</small>
              </div>
              <span className="text-muted">${record.price}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between bg-light">
            <span>Total (USD)</span>
            <strong>${Number(total).toFixed(2)}</strong>
          </li>
        </ul>
      </div>
      </div>
    </>
  )
}

export default Checkout;
