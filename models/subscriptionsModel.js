const mongoose = require("mongoose");

let subscriptionsSchema = new mongoose.Schema({
  memberid: mongoose.ObjectId,
  movies: [{ movieid: mongoose.ObjectId, date: Date }],
});

module.exports = mongoose.model("subscriptions", subscriptionsSchema);
