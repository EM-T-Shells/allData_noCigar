const { User, Thought } = require("../models");
const userCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);
module.exports = {
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({ user })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((updatedUser) => res.status(200).json(updatedUser))
      .catch((err) => res.status(500).json(err));
  },
  deleteUsers(req, res){
  },
  deleteSingleUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        return Promise.all([
          Thought.deleteMany({ _id: { $in: user.thoughts } }),
          Thought.updateMany(
            { _id: { $in: user.reactions } },
            { $pull: { reactions: user._id } }
          )
        ]);
      })
      .then(() => {
        res.status(200).json({ message: "User deleted and thoughts" });
      })
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true },
      (err, user) => {
        if (err) return res.status(500).json(err)
        if (!user) return res.status(404).json({ message: 'No user found with that ID' })
        return res.json('Deleted from friend list');
      }
    )
  },
};