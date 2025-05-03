const express = require('express')
require('dotenv').config(); //added for supabase
const supabase = require('./db') //added for supabase
const app = express()
const cors = require('cors')


app.use(cors())

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//cart
const menu = [
    {name: 'Americano', price: 2.5, type: 'hot',},
    {name: 'Latte', price: 3.0, type: 'hot'},
    {name: 'Cappuccino', price: 3.5, type: 'hot'},
    {name: 'Frozen Americano', price: 4.5, type: 'cold'},
    {name: 'Frozen Latte', price: 2.5, type: 'cold'},
    {name: 'Pup Cup', price: 0, type: 'cold'},
];


app.get('/', (req, res) => {
    console.log("hitting / route")
  res.send('Hello World')
})

app.get('/getMenu', (req, res) => {
    console.log('gn2 /getMenu')
    //reach out to the db to get the menu
    res.json(menu)
})

//user & password-----------------------------------------------------------
app.post('/login', async (req, res) => {
    console.log('gn2 /login', req.body)
    const { username, password } = req.body;
    console.log('username', username)
    console.log('password', password)
    const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password
    });
    if (error) {
        console.error('Signin error', error);
        return res.status(401).json({ error: error.message });
    }
    res.status(200).json({message: 'Success'})
})

const orderArray = [];

app.post('/checkout', (req, res) => {
    console.log('gn2 /checkout', req.body)

    if(!req.body || req.body.length < 1){
        res.status(400).json({message: "At least one item required for order"})
    }


    const order = req.body;
    console.log('order', order);

    orderArray.push(order);
    console.log('orderArray', orderArray)

    const confirmationNumber = '25668sgf';

    res.status(200).json({message: "Order PRocess Successfully", confirmationNumber: confirmationNumber});

})

//contact form section-----------------------------------------------------------------
const contactFormArray = [];

app.post('/contactForm', (req, res) => {
    console.log('gn2 /contactForm', req.body);

    // Check if the body has keys
    if (!req.body || Object.keys(req.body).length < 1) {
        return res.status(400).json({ message: "Please Add Contact Information" });
    }

    const { name, email } = req.body;
    console.log('name:', name);
    console.log('email:', email);

    const contactForm = { name, email };
    contactFormArray.push(contactForm);
    console.log('contactForm:', contactForm);

    res.status(200).json({ message: "Contact Info Submitted" });
});
//contact form ends-------------------------------------------------------------------------


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})
