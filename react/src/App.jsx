import React, { useState, useEffect } from "react"
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Search from "./components/Search"
import RecordDetails from "./components/RecordDetails"
import Home from "./components/Home"
import Cart from "./components/Cart";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Record Breakers</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Shop by Categories
                  </a>
                  <ul className="dropdown-menu">

                    <li><a className="dropdown-item" href="#">Pop</a></li>
                    <li><a className="dropdown-item" href="#">Rock</a></li>
                    <li><a className="dropdown-item" href="#">Jazz</a></li>
                    <li><a className="dropdown-item" href="#">Classical</a></li>
                    <li><a className="dropdown-item" href="#">Hip Hop</a></li>
                    <li><a className="dropdown-item" href="#">Country</a></li>
                    <li><a className="dropdown-item" href="#">Reggae</a></li>
                    <li><a className="dropdown-item" href="#">Blues</a></li>
                    <li><a className="dropdown-item" href="#">Folk</a></li>


                    {/* <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                  </ul>
                </li>
              </ul>
              <Search />
              <Link  to="/cart">
              <form className="d-flex" role="shoppingCart">
                <button className="btn btn-outline-success" type="submit">Shopping Cart</button>
              </form>
              </Link>
             
            </div>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/records/:id" element={<RecordDetails />} />
          <Route path= "/cart" element ={<Cart/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App