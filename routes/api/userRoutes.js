const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteSingleUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');
router.route('/')
  .get(getUsers)
  .post(createUser);
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteSingleUser)
  .post(addFriend)
  .delete(removeFriend);

  module.exports = router;
