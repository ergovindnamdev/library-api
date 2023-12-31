const express = require("express");
const userService = require('../services/user')
const { checkDuplicateUsernameOrEmail } = require("../auth/middlewares");
const { verifyToken } = require("../auth/middlewares/authJwt");

const router = express.Router();


router.post("/user", verifyToken, userService.getUsersByEmail);
router.get("/users", verifyToken, userService.getUsers);
router.put("/users/:id", verifyToken, userService.updateUserById);
router.delete("/users/:id", verifyToken, userService.deleteUser);

router.post(
    "/auth/signup",
    [
      checkDuplicateUsernameOrEmail,
    ],
    userService.signUp
  );

router.post("/auth/signin", userService.signIn);

module.exports = router;