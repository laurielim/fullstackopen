const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const closeMongooseConnection = () => {
  mongoose.connection.close(() => {
    console.log('Connection to MongoDB closed on app termination');
    process.exit(0);
  });
}

process.on('SIGINT', closeMongooseConnection).on('SIGTERM', closeMongooseConnection);

module.exports = mongoose.model('Contact', contactSchema)