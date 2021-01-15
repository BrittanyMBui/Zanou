const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/journal';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection.on('connected', ()=>{
    console.log(`Mongoose connected at ${connectionString}`);
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (err)=>{
    console.log(`Mongoose error: ${err}`);
});

module.exports = {
    User: require('./User'),
};