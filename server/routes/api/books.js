const router = require("express").Router();
const workoutController = require("../../controllers/workoutController");

// Matches with "/api/books"
router.route("/")
  .get(workoutController.findAll)
  .post(workoutController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(workoutController.findById)
  .put(workoutController.update)
  .delete(workoutController.remove);

module.exports = router;
