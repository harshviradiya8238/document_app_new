const asyncHandler = require("express-async-handler");

const { createSuccessResponse } = require("../utils/utils.js");
const User = require("../models/userModel.js");
const awsService = require("../utils/aws.js");
const Document = require("../models/documetModel.js");

const uploadDocument = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  // changes below are temporary needs to fix  later
  const { title, categoryId } = req.body;
  const { file } = req;
  const result = await User.findOne({ _id });
  if (!result) {
    res.status(400);
    throw new Error(`user not found`);
  }
  if (req.file) {
    const result = await awsService.uploadFile(file);
    const document = new Document({
      title,
      category: categoryId,
      docFile: result,
    });
    const uploadDoc = await document.save();
    createSuccessResponse(res, uploadDoc, 200, "Document Upload SuccessFully");
  } else {
    res.status(400);
    throw new Error(`Image is required`);
  }
});

const getDocuments = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const data = await Document.find({ ...keyword }).sort({
    createdAt: -1,
  });
  if (data) {
    createSuccessResponse(res, data);
  } else {
    res.status(400);
    throw new Error(`document not found`);
  }
});

module.exports = {
  uploadDocument,
  getDocuments,
};
