var credentials = require("../lib/credentials.js");
var mongoose = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };  

mongoose.connect(credentials, options);
var conn = mongoose.connection; 

conn.on('error', console.error.bind(console, 'connection error:'));  

var termSchema = mongoose.Schema({
    term: String,
    definition: String,
});

module.exports = mongoose.model('Term', termSchema);