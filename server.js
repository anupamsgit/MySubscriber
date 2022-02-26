require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');

const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to database'))

const port = 3000;

app.listen(port, () => console.log('App running on port :', port));

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)




























































////*********************************************CONNECT VIA MongoClient***************************************** */


// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// // Database Name
// const dbName = 'messageBoard';
// let database;

// app.use(bodyParser.json());
// app.use(cors());

// app.post('/api/message', async (req, res) => {
//     const message = req.body;
//     console.log(req.body);
//     database.collection('messages').insertOne(message);

//     const foundUser = await database.collection('messages').findOne({ userName: message.userName });
//     console.log(foundUser);
//     if (!foundUser) database.collection('users').insertOne({ userName: message.userName });

//     res.status(200).send();
// });

// app.get('/api/message', async (req, res) => {
//     const docs = await database.collection('messages').find({}).toArray();

//     if (!docs) return res.json({ 'error': 'error getting messages' });

//     res.json(docs);
// })


// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     database = client.db(dbName);

//     return 'done.';
// }

// main()
//     .then(console.log)
//     .catch('Error occurred: ' + console.error)
//     .finally();

