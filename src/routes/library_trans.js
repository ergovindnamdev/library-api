const express = require("express");
const LibraryTranServices = require('../services/library_trans')
const { verifyToken } = require("../auth/middlewares/authJwt");

const router = express.Router();

router.post("/libtrans", verifyToken, LibraryTranServices.createTrans);
router.get("/libtrans", verifyToken, LibraryTranServices.getAllTrans);
router.put("/libtrans/:id", verifyToken, LibraryTranServices.updateLibraryTransById);
router.delete("/libtrans/:id", verifyToken, LibraryTranServices.deleteTransByID);

module.exports = router;