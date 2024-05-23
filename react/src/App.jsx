import React, { useState, useEffect } from "react"
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Search from "./components/Search"
import Category from "./components/Category"
import RecordDetails from "./components/RecordDetails"
import Home from "./components/Home"
import Cart from "./components/Cart";
import Checkout from "./components/Checkout"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";


function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg bg-dark border-bottom bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Record Breakers</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Shop by Categories
                    </a>
                    <ul className="dropdown-menu">

                      <li><Link className="nav-link" to="/category/pop"><a className="dropdown-item">Pop</a></Link></li>
                      <li><Link className="nav-link" to="/category/rock"><a className="dropdown-item">Rock</a></Link></li>
                      <li><Link className="nav-link" to="/category/jazz"><a className="dropdown-item">Jazz</a></Link></li>
                      <li><Link className="nav-link" to="/category/classical"><a className="dropdown-item">Classical</a></Link></li>
                      <li><Link className="nav-link" to="/category/hip+hop"><a className="dropdown-item">Hip Hop</a></Link></li>
                      <li><Link className="nav-link" to="/category/country"><a className="dropdown-item">Country</a></Link></li>
                      <li><Link className="nav-link" to="/category/reggae"><a className="dropdown-item">Reggae</a></Link></li>
                      <li><Link className="nav-link" to="/category/blues"><a className="dropdown-item">Blues</a></Link></li>
                      <li><Link className="nav-link" to="/category/folk"><a className="dropdown-item">Folk</a></Link></li>
                    </ul>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search"
                    placeholder="Search" aria-label="Search"
                    value={searchTerm} onChange={handleChange} />
                  <Link to={"/search/" + searchTerm}>
                    <button className="btn btn-secondary" type="submit">Search</button>
                  </Link>
                </form>
                <Link to="/cart">
                  <form className="d-flex" role="shoppingCart">
                    <button className="btn btn-secondary" type="submit">Shopping Cart</button>
                  </form>
                </Link>

              </div>
            </div>
          </nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/records/:id" element={<RecordDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search/:term" element={<Search />} />
            <Route path="/category/:genre" element={<Category />} />
            <Route path="/checkout/:total" element={<Checkout />} />
          </Routes>
      </Router>
    </>
  )
}

export default App