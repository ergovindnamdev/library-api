const User = require("../../database/schema/user");

async function checkDuplicateUsernameOrEmail(req, res, next) {
  try{
    // Username
  let user = await User.findOne({
    username: req.body.username,
  });
  
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    user = await User.findOne({
      email: req.body.email,
    })

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
  
} catch (err) {
    console.error("verify", err);
}
}

module.exports = {
  checkDuplicateUsernameOrEmail,
};
