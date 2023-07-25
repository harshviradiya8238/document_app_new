const multer = require("multer");
const {
  getCategories,
  updateCategory,
  deleteCategory,
  createCategory,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getCategoryById,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (router) => {
  // public routes

  // private Routes
  router.route("/category").post(protect, createCategory);
  router.route("/getAllcategory").get(getCategories);

  router
    .route("/category/:_id")
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);
};
