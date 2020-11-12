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

CB 6.6 (Legacy) with Scope and Collection provided as model options

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
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines',
  id: '48bbab70-277b-4730-ba4a-c53fa200b292',
  _type: 'Airlines',
  _scope: 'us'
}
```

### Document Created

```JavaScript
key: 'us$Airlines::48bbab70-277b-4730-ba4a-c53fa200b292'

value: {
  callsign: "CBA",
  country: "United States",
  name: "Couchbase Airlines",
  id: "48bbab70-277b-4730-ba4a-c53fa200b292",
  _type: "Airlines",
  _scope: "us"
}
```

### Expected Result

This should have failed and thrown an error for document creation because we have explicitly specified a scope and collection.

## Test Case 02

CB 6.6 (Legacy) with model options not provided

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

### Expected Result

This should have created a document but there should not be a field `_scope` with value of `_default`.

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

### Expected Result

This should have created a doc but there should not be a field `_scope` with value of `_default`.

## Test Case 03A

CB 7.0 (Scope & Collection Supported) with model options not provided without using start

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

## Test Case 03B

CB 7.0 (Scope & Collection Supported) with model options not provided using start

### Options

```JavaScript
const options = {}
```

### Return Value

```sh
_Model {
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines',
  id: '02b64f3f-41b6-49f4-9c48-0cce957ef598',
  _type: 'Airline',
  _scope: '_default'
}
```

### Document Created

```JavaScript
key:  '_default$Airline::02b64f3f-41b6-49f4-9c48-0cce957ef598'

value: {
  callsign: "CBA",
  country: "United States",
  name: "Couchbase Airlines",
  id: "02b64f3f-41b6-49f4-9c48-0cce957ef598",
  _type: "Airline",
  _scope: "_default"
}
```

### Expected Result

Without specifying start a collection of 'Airline' should be added to the default scope. `_type` with value of `Airline` and `_scope` having a value of `_default` should not be added.

## Test Case 04

CB 7.0 (Scope & Collection Supported) with model options provided and using start

### Options

```JavaScript
const options = {
  collectionName: 'Airlines',
  scopeName: 'us'
}
```

### Return Value Without Defined Scope

```sh
_Model {
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines',
  id: '5d095363-f149-4d56-982d-efc4aef4b816',
  _type: 'Airlines',
  _scope: 'us'
}
```

### Document Created

```JavaScript
key:  'us$Airlines::5d095363-f149-4d56-982d-efc4aef4b816'

value: {
  callsign: "CBA",
  country: "United States",
  name: "Couchbase Airlines",
  id: "5d095363-f149-4d56-982d-efc4aef4b816",
  _type: "Airlines",
  _scope: "us"
}
```

### Options

```JavaScript
const options = {
  collectionName: 'Airlines',
  scopeName: '_default'
}
```

### Return Value

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

```JavaScript
key:  'us$Airlines::5d095363-f149-4d56-982d-efc4aef4b816'

value: {
  callsign: "CBA",
  country: "United States",
  name: "Couchbase Airlines",
  id: "5d095363-f149-4d56-982d-efc4aef4b816",
  _type: "Airlines",
  _scope: "_default"
}
```

### Expected Result for last two options

Document should be created under the specified scope adding a collection as specified

### Observerved

Document was created but there should not be a field named `_scope` with value supplied ('us or '_default')