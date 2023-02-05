const { User, Thought, Reaction } = require("../models");
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
  // get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const allThoughts = await Thought.find({});
      const count = await thoughtCount();
      res.status(200).json({ allThoughts, count });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // get one thought
  getThoughtById: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const thought = await Thought.findOne({ _id: thoughtId });
      if (thought) {
        const count = await reactionCount(thoughtId);
        res.status(200).json({ thought, count });
      } else {
        res.status(404).json({ message: "Thought not found!" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // create a thought
  createThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;
      const thought = await Thought.create({
        thoughtText,
        username,
      });
      res.status(201).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // update a thought
  updateThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { thoughtText } = req.body;
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { thoughtText },
        { new: true }
      );
      if (updatedThought) {
        res.status(200).json(updatedThought);
      } else {
        res.status(404).json({ message: "Thought not found!" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // delete a thought
  deleteThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const deletedThought = await Thought.findOneAndDelete({ _id: thoughtId });
      if (deletedThought) {
        res.status(200).json(deletedThought);
      } else {
        res.status(404).json({ message: "Thought not found!" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};