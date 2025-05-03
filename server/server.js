const express = require('express')
require('dotenv').config(); //added for supabase
const supabase = require('./db') //added for supabase
const app = express()
const cors = require('cors')


app.use(cors())

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//cart



app.get('/', (req, res) => {
    console.log("hitting / route")
  res.send('Hello World')
})

app.get('/getMenu', async (req, res) => {
    const { data: menu, error} = await supabase
    .from('menu')
    .select()

    if (error) {
        console.error('error', error);
        return res.status(500).json({ error: error.message });
        }
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

app.post('/contactForm', async (req, res) => {
    console.log('gn2 /contactForm', req.body);

    // Check if the body has keys
    if (!req.body || Object.keys(req.body).length < 1) {
        return res.status(400).json({ message: "Please Add Contact Information" });
    }

    const { firstName, lastName, email, comment } = req.body;
 


    const {data, error} = await supabase
    .from ('contact_form_messages')
    .insert([
        {
            first_name: firstName,
            last_name: lastName,
            email: email,
            comment: comment,
        }
    ])
    res.status(200).json({message: "Message Received Successfully"})

});
//contact form ends-------------------------------------------------------------------------


app.listen(3000, () => {
    console.log('server is listening on port 3000')
})
