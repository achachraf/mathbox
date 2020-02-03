const express = require("express");
const router = express.Router();
const knex = require("./../../config/db");
const auth = require("./../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//  @route  /api/users/:user_id
//  @method GET
//  @desc   get user by id

router.get("/user/:user_id", async (req, res) => {
  try {
    let { user_id } = req.params;
    let user = await knex("users")
      .select("username", "email", "creation_date")
      .where({ user_id })
      .first();
    if (!user) return res.status(400).send({ err: "User not found" });
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "server error" });
  }
});

//  @route  /api/users/auth
//  @method GET
//  @desc   get logged user
router.get("/auth", auth, async (req, res) => {
  try {
    let { user_id } = req.user;
    console.log("USER ID " + user_id);
    let user = await knex("users")
      .select("username", "email", "creation_date")
      .where({ user_id })
      .first();
    if (!user) return res.status(400).send({ err: "User not found" });
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "server error" });
  }
});

//  @route  /api/users/
//  @method POST
//  @desc   Create user
router.post("/", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    let user = await knex("users")
      .where({ username })
      .first();
    if (user) return res.status(400).send({ err: "Username already exist" });

    //Encrypt the password
    const salt = await bcrypt.genSalt(10);
    let cryptedPassword = await bcrypt.hash(password, salt);

    //inserting in database
    let user_id = await knex("users")
      .insert({
        username,
        password: cryptedPassword,
        email
      })
      .returning("user_id");

    //Return JWT
    const payload = {
      user: {
        user_id
      }
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.send({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: "server error" });
  }
});

module.exports = router;
