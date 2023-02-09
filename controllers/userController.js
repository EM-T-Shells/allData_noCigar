const { User, Thought } = require("../models");

const userCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);
module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      const userObj = {
        users,
        userCount: await userCount(),
      };
      return res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      return res.json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  deleteSingleUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      await Promise.all([
        Thought.deleteMany({ _id: { $in: user.thoughts } }),
        Thought.updateMany(
          { _id: { $in: user.reactions } },
          { $pull: { reactions: user._id } }
        ),
      ]);
      res.status(200).json({ message: "User deleted and thoughts" });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate( // friend is a field within the user document. so we update the friends array field within the user document. constrasts with a subdocument i.e Reaction schema
        { _id: req.params.userId },
        { $addToSet: { friends: mongoose.Types.ObjectId(req.params.friendId) } }, // convert string to ObjectId
        { new: true }
      );
      return res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: mongoose.Types.ObjectId(req.params.friendId) } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      return res.json('Deleted from friend list');
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

// Mongoose.Types is a library of types that are available for use with Mongoose. It includes utilities for converting between JavaScript objects, strings, and other data types. It also provides access to the ObjectId type which is used when referencing documents in a MongoDB database.