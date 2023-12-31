const express = require("express");
const LibraryTrans = require("../database/schema/library_trans");

async function createTrans(req, res) {
  const { user, book, due_date, trans_type } = req.body;
  try {
    const trans = await LibraryTrans.create({
      user,
      book,
      due_date,
      trans_type,
    });
    return res.status(200).send(trans);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

async function updateLibraryTransById(req, res) {
    const { id } = req.params;
    const { user, book, due_date, trans_type } = req.body;

    try {
        const updateFields = { user, book, due_date, trans_type };
        
        const trans = await LibraryTrans.findByIdAndUpdate(id, updateFields, { new: true });

        return res.status(200).send(trans);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}

async function getAllTrans(req, res) {
  try {
    let filter = {};

    // Check if user ID is provided in the query parameters for filtering
    if (req.query.userId) {
      filter.user = req.query.userId;
    }

    // Check if book ID is provided in the query parameters for filtering
    if (req.query.bookId) {
      filter.book = req.query.bookId;
    }

    const transactions = await LibraryTrans.find(filter)
      .populate({
        path: "user",
        select: "username name email contactNumber", // Specify user fields to retrieve
      })
      .populate({
        path: "book",
        select: "name author currentAvailabilityStatus", // Specify book fields to retrieve
      })
      .select("due_date trans_type");

      return res.status(200).json(transactions);

    // const trans = await LibraryTrans.find();
    // return res.status(200).send(trans);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}


async function deleteTransByID(req, res) {
  const { id } = req.params;

  try {
    const trans = await LibraryTrans.findByIdAndDelete(id);
    return res.status(200).send(trans);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

module.exports = {
    createTrans,
    updateLibraryTransById,
    getAllTrans,
    deleteTransByID
};
