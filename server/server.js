import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';

// for test commit
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
app.use(session({
    secret: 'breaking_records_key',
    resave: false,
    saveUninitialized: true
}));

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
        if (!req.session.shopping_cart) {
            req.session.shopping_cart = [];
        }

        res.status(200).json(req.session.shopping_cart)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Error in grabbing data");
    }
});

app.post('/cart/add/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        if (!req.session.shopping_cart) {
            req.session.shopping_cart = [];
        }

        req.session.shopping_cart.push(productId);

        res.status(201).send(`Successfully added product to shopping cart!`);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error in adding record!');
    }
});

app.delete('/cart/delete/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        console.log('Deleting record with ID:', productId);
        req.session.shopping_cart = req.session.shopping_cart.filter(id  => id !== productId)
        res.status(200).send('record deleted successfully from shopping cart!');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Could not delete record from shopping cart');
    }
});

app.post('/cart/checkout', async (req, res) => {
    try {
        const { name, email, address, city, state, zip, cardNumber, expirationDate, cvv } = req.body;
        const collection = db.collection('orders');
        
        const order_document = {
            name,
            email, 
            address,
            city,
            state,
            zip,
            cardNumber,
            expirationDate,
            cvv,
            shopping_cart: req.session.shopping_cart
        }

        await collection.insertOne(order_document).then(() => { 
            req.session.shopping_cart = [];
        });

        res.status(201).send('Sent order to MongoDB database!')
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error in adding record!');
    }
});

////
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
