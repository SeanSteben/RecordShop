import React, { useState, useEffect } from "react"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Record from "./components/Record"
import Search from "./components/Search"
import Featured from './components/Featured';
import RecordDetails from "./components/RecordDetails"
// import Home from "./components/Home"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

let filtered_records = [];
function App() {
  const [recordData, setRecordData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/records');
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
     
        filtered_records = json_response.filter((record) =>  record.is_new )
      
       
        setRecordData(json_response); // assign JSON response to the data variable.

      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Home/>}/> */}
        <Route path="/records/:id" element={<RecordDetails/>}/>
      </Routes>
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
          <Featured data={filtered_records} />
          <div className="row">

            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {recordData.map((record) => (
                <Record key={record._id} recordData={record} />


              ))}
              {/* {
                // Change from static sock_data to data coming from sock API
                data.map((sock) => (
                  <Sock key={sock._id} data={sock} /> // Change id to _id. _id is the key in the API response
                ))
              } */}


            </div>
          </div>
        </div>
      </main>
    </Router>
    </>
  )
}

export default App