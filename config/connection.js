const { connect, connection } = require('mongoose');


const connectionStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia'

mongoose.connect(connectionStr);

module.exports = connection;