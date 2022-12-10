const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phoneNumber = process.argv[4];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.eog9wiu.mongodb.net/?retryWrites=true&w=majority`;

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Contact = mongoose.model("Contact", contactSchema);

mongoose
  .connect(url)
  .then(() => {
    if (!phoneNumber) {
      Contact.find({}).then(result => {
        console.log("phonebook:");
        result.forEach(contact => console.log(contact.name, contact.phoneNumber));
        mongoose.connection.close();
      });
    } else {
      const contact = new Contact({
        name,
        phoneNumber,
      });
      contact.save().then(() => {
        console.log(`added ${name} number ${phoneNumber} to phonebook`);
        mongoose.connection.close();
      });
    }
  })
  .catch((err) => console.log(err));