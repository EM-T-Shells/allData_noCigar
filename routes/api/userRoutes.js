const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUserThgtRx,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUserThgtRx)

// /api/users/:id/friends/:id
router.route('/:id/friends/:id')
  .post(addFriend)
  .delete(removeFriend);

  module.exports = router;
