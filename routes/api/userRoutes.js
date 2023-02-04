const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUsers,
  deleteSingleUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser)
  .delete(deleteUsers);

// /api/users/:id
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteSingleUser)

// /api/users/:id/friends/:id
router.route('/:id/friends/:id')
  .post(addFriend)
  .delete(removeFriend);

  module.exports = router;
