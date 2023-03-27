const express = require('express')
const app = express();
const cors = require('cors')
const morgan = require('morgan')


let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(
            `
            <div>
                <p>Phonebook has info for ${persons.length} people</p>
            </div>
            <div>
                <p>${date}</p>
            </div>`
        )
})

app.get('/api/persons/', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id == id)
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()}
        }
)

app.delete('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})



app.post('/api/persons/', (request, response, next) => {
  const body = request.body;

  const personName = body.name;
  const personNumber = body.number;

  if (!personName || !personNumber) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    });
  }

  const newPerson = {
    name: personName,
    number: personNumber,
    id: Math.floor(Math.random() * 10000)
  };

  persons.push(newPerson);
  response.json(newPerson);
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
      name: body.name,
      number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  })

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
      next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})