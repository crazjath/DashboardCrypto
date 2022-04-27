const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
mongoose.connect(url)

// Database Name
const dbName = 'botdb';


module.exports = {client, dbName};