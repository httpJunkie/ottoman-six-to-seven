# Ottoman Six to Seven

In this repo we create basic model and schema in Ottoman and run against the database and see exactly what is created in the document and what happens in Ottoman as far as returned values and errors:

## Scenario Structure

The schema and actual airline document will be the same in all scenarios:

### Airline Schema

```JavaScript
const schema = new Schema({
  callsign: String,
  country: String,
  name: String
})
```

### Airline Document

```JavaScript
const united = new Airline({
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines'
})
```

In each scenario it's the options that will change:

### Model Options

```JavaScript
const options = {
  collectionName: 'Airlines',
  scopeName: 'us'
}
```

These options will be passed into the model creation method for the existing connection so the code below will not change each scenario either except that it will receive different options each time:

```JavaScript
const options = {
  collectionName: 'Airlines',
  scopeName: 'us'
}
```

## Test Case 01

CB 6.6 with Scope and Collection provided

### Options

```JavaScript
const options = {
  collectionName: 'Airlines',
  scopeName: 'us'
}
```

### Return Value

```JavaScript
_Model {
  callsign: 'ORACLE',
  country: 'United States',
  name: 'Oracle Airlines',
  id: '30a1d0f3-dd7c-40c8-906d-a598c74d0f27',
  _type: 'Airlines',
  _scope: 'us'
}
```

### Document Created 

```JavaScript
key: 'us$Airlines::30a1d0f3-dd7c-40c8-906d-a598c74d0f27'

value: {
  callsign: "ORACLE",
  country: "United States",
  name: "Oracle Airlines",
  id: "30a1d0f3-dd7c-40c8-906d-a598c74d0f27",
  _type: "Airlines",
  _scope: "us"
}
```

## Test Case 02

CB 6.6 with default Options

### Options

```JavaScript
const options = {}
```

### Return Value

```JavaScript
_Model {
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines',
  id: 'a5fb3197-133d-4a92-aba3-6be359127c22',
  _type: 'Airline',
  _scope: '_default'
}
```

### Document Created 

```JavaScript
key: '_default$Airline::a5fb3197-133d-4a92-aba3-6be359127c22'

value: {
  callsign: "ORACLE",
  country: "United States",
  name: "Oracle Airlines",
  id: "a5fb3197-133d-4a92-aba3-6be359127c22",,
  _type: "Airlines",
  _scope: "_default"
}
```

### Options

```JavaScript
const options = { 
  scopeName: '_default'
}
```

### Return Value

```JavaScript
_Model {
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines',
  id: '58979c16-d41f-45d3-b37e-906c5df68798',
  _type: 'Airline',
  _scope: '_default'
}
```

### Document Created 

```JavaScript
key:  '_default$Airline::58979c16-d41f-45d3-b37e-906c5df68798'

value: {
  callsign: "CBA",
  country: "United States",
  name: "Couchbase Airlines",
  id: "58979c16-d41f-45d3-b37e-906c5df68798",
  _type: "Airline",
  _scope: "_default"
}
```

## Test Case 03

CB 7.0 with default Options

### Options

```JavaScript
const options = {}
```

### Return Value

```sh
CollectionNotFoundError: collection not found
    at _getWrappedErr (/Users/ericbishard/dev/src/github/httpjunkie/ottoman-six-to-seven/node_modules/couchbase/lib/errors.js:836:14)
    at Object.wrapLcbErr (/Users/ericbishard/dev/src/github/httpjunkie/ottoman-six-to-seven/node_modules/couchbase/lib/errors.js:1009:20)
    at /Users/ericbishard/dev/src/github/httpjunkie/ottoman-six-to-seven/node_modules/couchbase/lib/collection.js:572:24 {
      cause: LibcouchbaseError { code: 211 },
      context: KeyValueErrorContext {
      status_code: 4,
      opaque: 0,
      cas: CbCas { '0': <Buffer 00 00 00 00 00 00 00 00> },
    key: '_default$Airline::9b575d53-8360-417e-9f39-37e0de5ed8fe',
    bucket: 'travel',
    collection: 'Airline',
    scope: '_default',
    context: '',
    ref: ''
  }
}
```

### Document Created 

No document created

## Test Case 04

CB 7.0 with Scope and Collection provided

### Options

```JavaScript
const options = {}
```

### Return Value Without Defined Scope

```sh
ScopeNotFoundError: scope not found
    at _getWrappedErr (/Users/ericbishard/dev/src/github/httpjunkie/ottoman-six-to-seven/node_modules/couchbase/lib/errors.js:848:14)
    at Object.wrapLcbErr (/Users/ericbishard/dev/src/github/httpjunkie/ottoman-six-to-seven/node_modules/couchbase/lib/errors.js:1009:20)
    at /Users/ericbishard/dev/src/github/httpjunkie/ottoman-six-to-seven/node_modules/couchbase/lib/collection.js:572:24 {
  cause: LibcouchbaseError { code: 217 },
  context: undefined
}
```

### Document Created 

No document created

### Options

```JavaScript
const options = {
  collectionName: 'Airlines',
  scopeName: '_default'
}
```

### Return Value Without Defined Scope

```sh
_Model {
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines',
  id: 'fee78aa7-d9d1-4a72-b57d-5a348ef1400e',
  _type: 'Airlines',
  _scope: '_default'
}
```

### Document Created 

No document created

