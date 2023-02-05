const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  createThought,
  deleteThoughts,
  deleteSingleThought,
  getReactions,
  getSingleReaction,
  updateReaction,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');
router.route('/')
  .get(getThoughts)
  .post(createThought);
router.route('/:id')
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought)
router.route('/:id/reactions')
  .get(getReactions)
  .post(createReaction)
  .put(updateReaction);
router.route('/:id/reactions/:id')
  .get(getSingleReaction)
  .delete(deleteReaction);

  module.exports = router;