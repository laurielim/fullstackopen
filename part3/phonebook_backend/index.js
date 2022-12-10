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

	const newContact = { ...req.body };
 	const contact = new Contact({...req.body})
	contact.save().then(savedContact => {
		res.json(savedContact);
	})
});

app.get("/api/persons/:id", (req, res, next) => {
	Contact
	  .findById(req.params.id)
		.then(contact => {
		  if (!contact) return res.status(404).end();
      res.json(contact)
    })
		.catch(error => next(error))
});

app.delete("/api/persons/:id", (req, res, next) => {
	Contact
	  .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
  const contact = { ...req.body }
	Contact
	  .findByIdAndUpdate(req.params.id, contact, { new: true })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "Unknown endpoint" });
};

// Handler of requests with unknown endpoint.
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

	if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" })
  }

  next(error)
}

// Handler of requests with result to errors.
// This has to be the last loaded middleware.
app.use(errorHandler)
