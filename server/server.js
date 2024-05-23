import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';

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
    saveUninitialized: true,
    // cookie: true
}));
let cart = [];
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
        console.log('in genre')
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
        console.log('hit search route')
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

        // res.status(200).json(req.session.shopping_cart)
        res.send(cart);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Oops! Error in grabbing data");
    }
});

app.post('/cart/add', async (req, res) => {
    try {
        if (!req.session.shopping_cart) {
            req.session.shopping_cart = [];
        }

        req.session.shopping_cart.push(req.body);
        cart.push(req.body);
        res.status(201).send(cart);
        console.log(req.session.shopping_cart);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error in adding record!');
    }
});

app.delete('/cart/delete', async (req, res) => {
    try {
        // req.session.shopping_cart = req.session.shopping_cart.filter(product  => JSON.stringify(product) !== JSON.stringify(req.body))
        cart = cart.filter(product  => JSON.stringify(product) !== JSON.stringify(req.body))
        // res.status(200).json(req.session.shopping_cart);
        res.status(200).send(cart);
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
            shopping_cart: cart
        }

        cart = [];
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
