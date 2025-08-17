const express = require("express");
const router = express.Router();
const { login } = require("../controllers/users.controllers.js");
const { register } = require("../controllers/users.controllers.js");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/addtoactivity");
router.route("/getallactivity");

module.exports = router;
