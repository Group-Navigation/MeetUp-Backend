const express = require("express");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router2 = express.Router();
const users = require("../Database/Models/Users");

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    lat: Joi.number(),
    long: Joi.number()
  };
  return Joi.validate(req, schema);
}

router2.post("/", async (req, res) => {
  try {
    console.log("Login request: ", req.body);

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await users.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("Invalid email or password");
    //console.log("user: ", user);
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send("Invalid email or password");

    console.log(req.body);
    console.log(user.dataValues);
    user.lat = req.body.lat;
    user.long = req.body.long;

    const token = jwt.sign(
      _.pick(user, ["id", "name", "email", "image", "long", "lat"]),
      "myJwtKey"
      // config.get("jwtKey")
    );
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send("Login Successful !"); //
  } catch (error) {
    console.log(error);
  }
});

module.exports = router2;
