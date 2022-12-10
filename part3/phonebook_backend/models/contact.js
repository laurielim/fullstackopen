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
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{2,3}-?\d{5,}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  },
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