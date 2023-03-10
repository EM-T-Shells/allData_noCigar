const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        //This regex is used to validate an email address. It checks for one or more characters before the @ symbol, one or more characters after the @ symbol, and one or more characters after the period.
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

userSchema.virtual('friendCount')
.get(function() {
    return this.friends.length;
});
 // a virtual field can be used to take two pre-defined items and create a new item by merging them. For example, a virtual field may be used to compute a full name field from a first name and last name field.

const User = model('User', userSchema);
module.exports = User;