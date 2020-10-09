const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://milludds:${password}@cluster0.twmzd.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
  date: new Date()
})

switch (process.argv.length) {
    case 5:
        person.save().then(result => {
            console.log(`added ${name} number: ${number} to phonebook`)
            mongoose.connection.close()
        })
        break
    case 3:
        Person
            .find({})
            .then(persons => {
                console.log('phonebook:')
                persons.forEach(person => {
                    console.log(`${person.name} ${person.number}`)
                })
                mongoose.connection.close()
            })
        break
    case 4:
        console.log('Name or number missing, please provide both')
        process.exit(1)
    default:
        console.log("Correct use should be 'node mongo.js <password> <name> <number>'")
        process.exit(1)
}


