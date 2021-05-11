const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;
Mongoose.connect(
  `FILL THIS IN`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const mongo = Mongoose.connection;

mongo.on('error', () => {
  console.log(`MongoDB connection has failed, Check if MongoDB is Currently Running.`);
  process.exit();
});

mongo.once('open', () => {
  console.log('MongoDB connection successful obtained.');
});

module.exports = mongo;