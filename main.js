const express = require("express");
const memAndMovBL = require("./BL/membersAndMoviesBL");
const dotenv = require("dotenv");
const path = require("path");

const subscriptionsRouter = require("./routers/subscriptionsRouter");
const membersRouter = require("./routers/membersRouter");
const moviesRouter = require("./routers/moviesRouter");
const usersRouter = require("./routers/userRouter");
//const session = require("express-session");
var cors = require("cors");
process.env.NODE_ENV = "production";

const PORT = process.env.PORT || 3001;

dotenv.config();

let app = express();

require("./configs/database");
app.use(cors());

// app.use(
//   session({
//     secret: "my-secret",
//     rolling: true,
//     saveUninitialized: true,
//     cookie: {},
//   })
// );

memAndMovBL.saveMemberTODB();
memAndMovBL.saveMoviesTODB();

app.use(express.json());

app.use("/api/sub", subscriptionsRouter);
app.use("/api/members", membersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join((__dirname, "client/build"))));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api running");
  });
}

app.listen(PORT, console.log(`server is starting at ${PORT}`));
