const { login } = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");

module.exports = (router) => {
  // public routes
  router.route("/user/login").post(login);
  // common routes
  // router.route("/user").get(protect, getUsers).post(protect, createUser)
};
