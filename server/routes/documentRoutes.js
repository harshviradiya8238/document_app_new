const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  uploadDocument,
  getDocuments,
} = require("../controllers/docmentContoller.js");
const { protect } = require("../middleware/authMiddleware.js");

module.exports = (router) => {
  // public routes
  router
    .route("/document/uploadDocument/:id")
    .post(upload.single("docFile"), uploadDocument);

  router
    .route("/document/getDocuments")
    .get(upload.single("docFile"), getDocuments);
};
