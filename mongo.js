const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}


const password = process.argv[2]


const url =
  `mongodb+srv://pl-fullstack:${password}@puhelinluettelocluster.awmanbm.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===5) {
  const givenName = process.argv[3]
  const givenNumber = process.argv[4]



  const person = new Person({
    name: givenName,
    number: givenNumber,
  })


  person.save().then(() => {
    console.log('Added' , givenName, 'number', givenNumber, 'to phonebook')
    mongoose.connection.close()
  })

}

if (process.argv.length===3) {
  console.log('phonebook:')

  Person.find({}).then(result => {

    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}