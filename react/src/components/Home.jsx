import React, {useState, useEffect} from 'react';
import Featured from './Featured';
import Record from "./Record"

const Home = (props) => { 
    let filtered_records = [];
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
    );
};

export default Home; 