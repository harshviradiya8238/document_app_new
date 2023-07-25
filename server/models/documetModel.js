const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    docFile: {
      url: { type: String, required: true },
      key: { type: String, required: true },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
