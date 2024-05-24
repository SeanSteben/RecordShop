import React, { useState, useEffect } from 'react';
import Featured from './Featured';
import Record from "./Record"
import recordImage from '../assets/record.png'

let filtered_records = [];//global must be outside of Home
const Home = (props) => {

  const [recordData, setRecordData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/records');
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();

        filtered_records = json_response.filter((record) => record.is_new)



        setRecordData(json_response); // assign JSON response to the data variable.

      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main role="main" className="col-12 no-padding" style={{width:'100%'}}>
        <div className="container-fluid">
        <header class="py-4" style={{backgroundImage: "linear-gradient( 135deg, #FFA6B7 10%, #1E2AD2 100%)", marginBottom: "40px"}}>
          <Featured data={filtered_records} />
          </header>
          <hr class="shadow"/>
          <div className="row">
          <h3 class="fw-bolder" style={{marginBottom: "30px"}}>Our Catalog</h3>
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {recordData.map((record) => (
                <Record key={record._id} recordData={record} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home; 