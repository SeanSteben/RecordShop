import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
//const url = 'mongodb://localhost:27017/';
const dbName = process.env.MONGO_DB;
//const dbName = 'breaking_records';
//const PORT = process.env.PORT;
const PORT = 3000; 

const client = await MongoClient.connect(url);
const db = client.db(dbName);

const app = express();
app.use(cors()); 

// Middleware to parse JSON bodies
app.use(express.json());




app.get('/', (req, res) => {
    res.send('welcome to the record shop!')
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