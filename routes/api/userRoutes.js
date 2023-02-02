const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);


  // removing user associated thoughts upon user deletion
UserSchema.pre("remove", async function (next) {
  try {
    // find all thoughts associated with the user
    const thoughts = await Thought.find({
      _id: {
        $in: this.thoughts,
      },
    });
    // remove all thoughts associated with the user
    await Promise.all(thoughts.map((thought) => thought.remove()));
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});


  module.exports = router;
