const ottoman = require('ottoman')

const { model, Schema } = require('ottoman');

// create connection to database/bucket
const connection = ottoman.connect({
  connectionString: 'couchbase://localhost',
  bucketName: 'travel',
  username: 'Administrator',
  password: 'password'
});

const schema = new Schema({
  callsign: String,
  country: String,
  name: String
})

const options = { 
  scopeName: '_default'
}

const Airline = connection.model(
  'Airline', schema, options
)

const united = new Airline({
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines'
})

// run the query
const runAsync = async() => {
  try {
    let result = await united.save()
    console.log(`success: airline added`)
    console.log(result)
  } catch (error) {
    throw error
  }
}

ottoman.ensureIndexes()
  .then(() => {
    runAsync()
      .catch(e => {
        console.log(e)
        //process.exit(0)
      })
  })

// run against CB Server 7.0
// Supplying default should error