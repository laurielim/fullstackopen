const express = require("express"); // Similar to import in React
const morgan = require("morgan");
const app = express();

app.use(express.json());

morgan.token("content", (req, res) => {
	if (req.method == "POST") {
		return JSON.stringify(req.body);
	}
});

app.use(
	morgan(":method :url :status :res[content-length] :response-time ms :content")
);

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
	res.send(
		`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
	);
});

app.get("/api/persons", (req, res) => {
	res.json(persons);
});

app.post("/api/persons", (req, res) => {
	if (Object.keys(req.body).length < 2) {
		return res.status(400).json({
			error: "Content missing",
		});
	}

	if (persons.map((person) => person.name).includes(req.body.name)) {
		return res.status(400).json({
			error: "Name must be unique",
		});
	}

	const newContact = { ...req.body, id: new Date() };
	persons = persons.concat(newContact);
	res.json(newContact);
});

app.get("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	const person = persons.find((person) => person.id == id);
	if (!person) return res.status(404).end();
	res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
