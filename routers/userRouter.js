const loginBL = require("../BL/loginBL");
const jwt = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleWare");
const userModelBL = require("../models/userModelBL");

const express = require("express");

const usersBL = require("../BL/usersBL");

const router = express.Router();

router.get("/", validateToken, async function (req, resp) {
  let users = await usersBL.getUsers();
  return resp.json(users);
});

router.route("/log").post(async function (req, res) {
  let obj = req.body;

  let validUser = await loginBL.authCheck(obj);

  if (!validUser) {
    return res.json({ error: " Wrong UserName Or Passward" });
  }

  if (validUser) {
    let sess = req.session;

    sess.name = validUser.name;
    sess.role = validUser.role;
    sess.sessTime = validUser.sessionTime;
    sess.perm = validUser.permitions;
    sess.cookie.expires = 60000 * parseInt(validUser.sessionTime);

    const userId = validUser.name;

    var token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: 7200,
    });
    res.json({ token, validUser });
  }
});

router.post("/add", async function (req, resp) {
  let obj = req.body;
  let stat = await usersBL.addNewUse(obj);
  return resp.json(stat);
});

router.delete("/del/:id", validateToken, async function (req, resp) {
  let id = req.params.id;
  let stat = await usersBL.deleteUserAll(id);
  return resp.json(stat);
});

router.get("/:id", validateToken, async function (req, resp) {
  let id = req.params.id;
  let stat = await usersBL.getUserDetails(id);
  return resp.json(stat);
});

router.put("/upd/:id", validateToken, async function (req, resp) {
  let id = req.params.id;
  let obj = req.body;
  let stat = await usersBL.updateUser(id, obj);

  return resp.json(stat);
});

router.get("/session", validateToken, async function (req, resp) {
  let sess = req.session;

  if (!sess) {
    return false;
  } else {
    return sess;
  }
});

module.exports = router;
