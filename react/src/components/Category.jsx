import react, { useState, useEffect } from 'react';
import Record from "./Record";
import {
    useParams,
} from 'react-router-dom';

const Category = () => {
    let { genre } = useParams();
    const [recordData, setRecords] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/search/${genre}`);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setRecords(json_response); // assign JSON response to the data variable.
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <h3>{genre.charAt(0).toUpperCase() + genre.slice(1)} Records:</h3>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <div className="container-fluid">
                    <div className="row">
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
}

export default Category;