const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  getReaction,
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
  .post(addReaction);

router.route('/:id/reactions/:id')
  .delete(removeReaction);

  module.exports = router;