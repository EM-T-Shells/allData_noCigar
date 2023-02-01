const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addThought,
  updateThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

router.route('/')
  .get(getThoughts)
  .post(createThought);

router.route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteThought)
  .post(addThought)
  .put(updateThought)

router.route('/:thoughtId/reactions')
  .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

  module.exports = router;

// router.route('/:thoughtId').get(getSingleThought).post(addThought);
// router.route('/:thoughtId').get(getSingleThought).put(updateThought);
// router.route('/:thoughtId/reactions').post(addReaction);
// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


