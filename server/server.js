import express from 'express';

dotenv.config(); 
const app = express(); 
app.use(cors());
app.use(express.json());
const PORT = 3000;

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