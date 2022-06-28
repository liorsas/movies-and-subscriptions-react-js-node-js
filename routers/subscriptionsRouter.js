const express = require("express");

const subscriptionsBL = require("../BL/subscriptionsBL");
const subscriptionModelBL = require("../models/subscriptionsModelBL");
const { validateToken } = require("../middlewares/AuthMiddleWare");

const router = express.Router();

router.get("/", validateToken, async function (req, resp) {
  let subscriptions = await subscriptionsBL.getSubscriptions();
  return resp.json(subscriptions);
  //}
});

router.route("/:id").get(async function (req, resp) {
  let idval = req.params.id;

  let subscription = await subscriptionsBL.getSubscription(idval);
  return resp.json(subscription);
});

router.post("/", validateToken, async function (req, resp) {
  let data = req.body;

  let status = await subscriptionsBL.addSubscription(data);
  return resp.json(status);
});

router.put("/update/:id", validateToken, async function (req, resp) {
  let id = req.params.id;
  let data = req.body;

  let status = await subscriptionsBL.updateSubscription(id, data);
  return resp.json(status);
});

router.route("/del/:id").delete(async function (req, resp) {
  id = req.params.id;
  let status = await subscriptionsBL.deleteMember(id);
  return resp.json(status);
});

router.put("/delmov/:id", validateToken, async function (req, resp) {
  let memId = req.params.id;
  let movId = req.body.movieid;

  let status = await subscriptionsBL.deleteMovieFromMember(memId, movId);
  return resp.json(status);
});

module.exports = router;
