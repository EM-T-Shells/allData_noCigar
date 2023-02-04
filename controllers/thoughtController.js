const { User, Thought } = require("../models");
const thoughtCount = async () =>
  Thought.aggregate()
    .count("thoughtCount")
    .then((numberOfThoughts) => numberOfThoughts);
const reactionCount = async (thoughtId) => {
  let reactionQuery = {};
  if (thoughtId) {
    reactionQuery.thoughtId = thoughtId;
  }
  return Reaction.aggregate()
    .count("reactionCount")
    .where(reactionQuery)
    .then((numberOfReactions) => numberOfReactions);
};
module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          thoughtCount: await thoughtCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: thought.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({
                message: "Thought created, but found no user with that ID",
              })
          : res.json("Created thought")
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText },
      { new: true }
    )
      .then((updatedThought) => res.status(200).json(updatedThought))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }, // returns object after update rather than default method returning object before update
      (err, user) =>{
        if (err) return res.status(500).json(err);
        if (!user) return res.status(404).json({ message: 'No user found with that ID' });
        return res.json('Deleted from friend list');
      }
    )
  },
  getReactions(req, res) {
    Reaction.find()
      .then(async (reactions) => {
        const reactionObj = {
          reactions,
          reactionCount: await reactionCount(),
        };
        return res.json(reactionObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleReaction(req, res) {
    Reaction.findOne({ _id: req.params.reactionId })
    .select("-__v")
    .then((reaction) =>
      !reaction
        ? res.status(404).json({ message: "No reaction with that ID" })
        : res.json(reaction)
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  updateReaction(req, res) {
    const { reactionId } = req.params;
    const { reaction } = req.body;
    Reaction.findByIdAndUpdate(reactionId, reaction, { new: true })
      .then((updatedReaction) => {
        if (!updatedReaction) {
          return res.status(404).json({
            message: "Reaction not found",
          });
        }
        return res.json(updatedReaction);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought found with that ID" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true },
      (err, user) => {
        if (err) return res.status(500).json(err);
        if (!user) return res.status(404).json({ message: 'No user found with that ID' });
        return res.json('Deleted from friend list');
      }
    )
  }
}

/*A controller can be defined as the entity that will be responsible for manipulating models and initiating the view render process with the data received from the corresponding model*/