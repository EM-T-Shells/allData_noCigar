const { ObjectId } = require("mongodb");
const { Schema } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: ObjectId,
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
