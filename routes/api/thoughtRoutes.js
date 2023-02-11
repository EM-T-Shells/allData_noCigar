const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  updateThought,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

router.route('/')
  .get(getThoughts)
  .post(createThought);
router.route('/:id')
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);
router.route('/:id/reactions')
  .post(createReaction);
router.route('/:id/reactions/:id')
  .delete(deleteReaction);

  module.exports = router;