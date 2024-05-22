import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';


dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const PORT = process.env.PORT;

const client = await MongoClient.connect(url);
const db = client.db(dbName);

const app = express();
app.use(cors());
app.use(morgan('tiny')); // Middleware for logging, making sure routes are being called

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/records', async (req, res) => {
    try {
        const collection = db.collection('records');
        const allRecords = await collection.find({}).toArray();
        res.status(200).json(allRecords);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Error in grabbing data");
    }
});

app.get('/records/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const collection = db.collection('records');
        const matching_record = await collection.findOne({ "id": Number(id) });
        res.status(200).send(matching_record);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Error with searching records')
    }
})

app.get('/search/:genre', async (req, res) => {
    try {
        const { genre } = req.params;
        const collection = db.collection('records');
        const matching_records = await collection.find({ "genre": genre.charAt(0).toUpperCase() + genre.slice(1) }).toArray();
        res.status(200).send(matching_records);
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Error with searching records')
    }
});

app.post('/search', async (req, res) => {
    // Searches based on user input matching album_name or band_name.
    // ex. http://localhost:3000/search?q=Hello+World
    try {
        const search_params = req.query.q;
        const collection = db.collection('records');
        const matching_records = await collection.find(
            {
                $or: [
                    { "album_name": search_params },
                    { "band_name": search_params }
                ]
            }).toArray();
        res.status(200).send(matching_records)
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Error with searching records')
    }
});

app.get('/cart', async (req, res) => {
    try {
        const collection = db.collection('orders');
        const allOrders = await collection.find({}).toArray();
        res.status(200).json(allOrders);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Error in grabbing data");
    }
});

app.post('/cart/add', async (req, res) => {
    try {
       const record = req.body; 
       const collection = db.collection('orders');
       const result = await collection.insertOne(record);
       res.status(201).send(`{"_id":"${result.insertedId}"}`);
    } catch (err) { 
        console.error('Error:', err);
        res.status(500).send('Error in adding record!');
    }
});

// app.delete('/cart/delete/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const collection = db.collection('orders')
//         console.log('Deleting record with ID:', id);
//         const result = await collection.deleteOne({_id: new ObjectId(id)});
//         if (result.deletedCount === 1) { 
//             res.status(200).send(`Successfully deleted record with ID: ${id}`);
//         }
//         else { 
//             res.status(404).send(`Could not find record with ID: ${id}`);
//         }
//         res.status(200).send('record deleted successfully');
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
//     }
// });

// app.post("/checkout/:id", async (req, res) => {
//     // From documentation: 
//     // When the user is finished shopping, the checkout
//     // view will show them all the products in their cart,
//     // an order total, and a place for them to put their
//     // payment and shipping info. When they checkout, their cart
//     // is cleared, and the order is saved to the database.


//     // In request body, take in list of products from cart, order total (accumulated)
//     // and user input for payment info(?) and shipping information.
//     try {
//         const {name, address} = req.body;
//         const collection = db.collection('orders');
//         const result = await collection.updateOne(
//             {_id: id},
//             {$set: {name, address}}
//         );

//         console.log(new ObjectId(Number(id)))
//         if (result.modifiedCount == 0) { 
//             res.status(500).send('Could not add order to database!')
//         }
//         else {
//             res.status(201).send(`{"_id": "${result.upsertedId}"}`);
//         }
//     } catch (err) { 
//         console.error('Error:', err);
//         res.status(500).send('Error in adding order!');
//     }
// });

////
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
