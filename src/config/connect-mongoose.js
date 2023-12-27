
const mongoose = require('mongoose');

const config = require('dotenv').config();

let uri = '';

if (config.NODE_ENV === 'local') {
  
//uri = 'mongodb://127.0.0.1:27017/comingsoondashboard'
  
uri = 'mongodb://jamshaid_585:BPofeukeHYtwy8y3@cluster0-shard-00-00.jbj0k.mongodb.net:27017,cluster0-shard-00-01.jbj0k.mongodb.net:27017,cluster0-shard-00-02.jbj0k.mongodb.net:27017/hporx?ssl=true&replicaSet=atlas-12f8wi-shard-0&authSource=admin&retryWrites=true&w=majority'
  
} else {
  uri = 'mongodb://' + config.DB_USER + ':' + config.DB_PASSWORD + '@' + config.DB_HOST + ':' + config.DB_PORT + '/' + config.DB_NAME + '?authSource=' + config.DB_authSource;
}
const options = {
  useMongoClient: true,
  /* useNewUrlParser: true, 
  useUnifiedTopology: true */
};
mongoose.connect(uri, options);

//mongoose.openUri(uri)

console.log('Mongoose connecting to: ' + uri);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected');
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
