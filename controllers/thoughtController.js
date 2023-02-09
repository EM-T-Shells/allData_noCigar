const { Thought } = require("../models");
const thoughtCount = async () => {
  Thought.aggregate()
    .count("thoughtCount")
    .then((numberOfThoughts) => numberOfThoughts);
}
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
  getThoughts: async (req, res) => {
    try {
      const allThoughts = await Thought.find({});
      const count = await thoughtCount();
      res.status(200).json({ allThoughts, count });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findOne({ _id: req.params.id }).select(
        "-__v"
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      return res.json({ thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  updateThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { thoughtText } = req.body;
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
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
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        return res.status(404).json({ message: "Thought not found" });
      }
      res.status(200).json({ message: "Thought deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getReaction: async (req, res) => {
    try {
      const reaction = await Reaction.findById(req.params.reactionId);
      if (!reaction) {
        return res.status(404).json({ message: "Reaction not found" });
      }
      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createReaction: async (req, res) => {
    try {
      const reaction = await Reaction.create({
        thought: req.params.id,
        reactionBody: req.body.reactionBody,
      });
      res.status(201).json(reaction);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteReaction: async (req, res) => {
    try {
      const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
      if (!deletedReaction) {
        return res.status(404).json({ message: "Reaction not found" });
      }
      res.status(200).json({ message: "Reaction deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};