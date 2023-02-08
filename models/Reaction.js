const { ObjectId } = require("mongodb"); //This syntax indicates that the Reaction schema requires the ObjectId data type from the MongoDB library. ObjectId represents a 12-byte BSON type used to uniquely identify documents in MongoDB.
const { Schema } = require("mongoose");
const reactionSchema = new Schema({
  reactionId: {
    type: ObjectId, // ObjectId is a 12-byte BSON type used to uniquely identify documents in MongoDB
    default: new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => (date ? date.toISOString().split("T")[0] : null),
  },
});
module.exports = reactionSchema;

//The letter 'T' is used as the separator character because it is the standard separator character used in ISO 8601 date strings.
// if the string "2020-05-20T12:00:00" is passed into the .split('T')[0] method, it will return the substring "2020-05-20".
