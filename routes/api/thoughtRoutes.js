const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  updateThought,
  createThought,
  deleteThought,
  getReactions,
  getSingleReaction,
  updateReaction,
  addReaction,
  removeReaction,
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
  .post(addReaction)
  .put(updateReaction);
router.route('/:id/reactions/:id')
  .get(getSingleReaction)
  .delete(removeReaction);

  module.exports = router;