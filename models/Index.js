const User = require('./User');
const Thought = require('./Thought');

module.exports = { User, Thought }

// reaction schema not included b.c purpose is to serve as a subdocument within the Thought document

//A model is a class that is used to create documents in a collection. It is used to create, read, update, and delete documents. A schema is a structure that defines the shape of documents within a collection. It is used to define the properties of a document and the types of data that can be stored in each property.