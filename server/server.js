import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const PORT = process.env.PORT;


const client = await MongoClient.connect(url);
const db = client.db(dbName);

const app = express();
app.use(cors()); 

// Middleware to parse JSON bodies
app.use(express.json());


app.get('/', (req, res) => {
    res.send('welcome to the record shop!')
});

// Figure out what routes to include for records.
app.get('/search', (req, res) => { 
    res.status(200).send('placeholder, sends matching products')
});

app.get('/search/:category', (req, res) => {
    res.status(200).send(`placeholder, sends matching products to specific category`)
})


app.post("/checkout", (req, res)=> {
    // From documentation: 
    // When the user is finished shopping, the checkout
    // view will show them all the products in their cart,
    // an order total, and a place for them to put their
    // payment and shipping info. When they checkout, their cart
    // is cleared, and the order is saved to the database.


    // In request body, take in list of products from cart, order total (accumulated)
    // and user input for payment info(?) and shipping information.
    res.status(200).send('Order sent to database!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/allrecords', async (req, res) => {
    try {
        const collection = db.collection('records');
        const allRecords = await collection.find({}).toArray();
        res.json(allRecords);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Error in grabbing data");
    }

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
