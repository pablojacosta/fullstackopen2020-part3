require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
// app.use(morgan('tiny'))
morgan.token('postData', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

/*
let persons = [

  { 
    name: "Arto Hellas", 
    number: "040-123456",
    id: 1
  },
  { 
    name: "Ada Lovelace", 
    number: "39-44-5323523",
    id: 2
  },
  { 
    name: "Dan Abramov", 
    number: "12-43-234345",
    id: 3
  },
  { 
    name: "Mary Poppendieck", 
    number: "39-23-6423122",
    id: 4
  }
]
*/

app.get('/', (req, res) => {
    res.send('<h1>Root</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${Person.length} people<br>
        ${new Date}</p>`
        )
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    Person.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const person = new Person({
      name: body.name,
      number: body.number,
      date: new Date(),
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  /*
// For random id on POST
const randomizeId = (min, max) => {
    return Math.random() * (max - min) + min;
  }

const generateId = () => {
    return Math.floor(randomizeId(persons.length + 1, 1000))
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } 
    
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)

})
*/

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
