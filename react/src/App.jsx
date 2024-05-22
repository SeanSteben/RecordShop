import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Record from "./components/Record"
import recordTest_data from "./assets/recordTest.json"
import Search from "./components/Search"

function App() {

  return (
    <>
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
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>

            <Search />

            <form className="d-flex" role="shoppingCart">
              <button className="btn btn-outline-success" type="submit">Shopping Cart</button>
            </form>
          </div>
        </div>
      </nav>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">

        <div className="container-fluid">
          <div className="row">
            Both socks and space rockets 🚀 will take you to new heights, but only one will get cold feet!
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {recordTest_data.map((record) => (
                <Record key={record.id} data={record} />

              ))}

              {/* {
                sock_data.map((sock) => (
                  <Sock key={sock.id} data={sock} />
                ))
              } */}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App