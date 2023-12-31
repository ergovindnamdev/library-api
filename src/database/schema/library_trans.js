const mongoose = require("mongoose");

const LibraryTrans = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    book: [{ type: mongoose.Schema.Types.ObjectId, ref: "Books" }],
    due_date: String,
    trans_type: String,
  },
  { timestamps: true }
);

const LibraryTran = mongoose.models.LibraryTrans || mongoose.model("LibraryTrans", LibraryTrans);

module.exports = LibraryTran;
