import react, {useState, useEffect} from 'react';
import {
    useParams,
} from 'react-router-dom';
//follow home component to display results
const Category = () => { 
    let { genre } = useParams();
    const [records, setRecords] = useState([])

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
            <h1>Genre: {genre}</h1>
            <p>{JSON.stringify(records)}</p>
        </>   
    );
}

export default Category;