require('dotenv').config()
const express = require("express"); // Similar to import in React
const morgan = require("morgan");
const cors = require('cors')
const Contact = require('./models/contact')

const app = express();

app.use(express.json());
app.use(express.static('build'))

morgan.token("content", (req, res) => {
	if (req.method == "POST") {
		return JSON.stringify(req.body);
	}
});

app.use(
	morgan(":method :url :status :res[content-length] :response-time ms :content")
	);

app.use(cors());

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

app.get("/", (req, res) => {
	res.send("Hello World!!!");
});

app.get("/info", (req, res) => {
	Contact.find({}).then(contacts => {
		res.send(
			`<p>Phonebook has info for ${contacts.length} people</p><p>${new Date()}</p>`
		);
	})
});

app.get("/api/persons", (req, res) => {
	Contact.find({}).then(contacts => {
		res.json(contacts);
	})
});

app.post("/api/persons", (req, res) => {
	if (Object.keys(req.body).length < 2) {
		return res.status(400).json({
			error: "Content missing",
		});
	}

/* 	if (persons.map((person) => person.name).includes(req.body.name)) {
		return res.status(400).json({
			error: "Name must be unique",
		});
	} */

	const newContact = { ...req.body };
 	const contact = new Contact({...req.body})
		contact.save().then(savedContact => {
			res.json(savedContact);
	})
});

app.get("/api/persons/:id", (req, res) => {
	Contact
	  .findById(req.params.id)
		.then(contact => {
		  if (!contact) return res.status(404).end();
      res.json(contact)
    })
		.catch(error => {
      console.log(error);
      res.status(400).send({ error: "Malformatted id" })
    })
});

app.delete("/api/persons/:id", (req, res) => {
	Contact
	  .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
			console.log(error);
      res.status(400).send({ error: "Couldn't delete contact" })
		})
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);
