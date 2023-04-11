const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { requireAuth } = require("./middlewares/authMiddleware");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// database connection
// const dbURI =
//   "mongodb+srv://allotei5:qKj9A06FgNw6nWL2@taskmanagerdb.pxlakbc.mongodb.net/?retryWrites=true&w=majority";

const dbURI =
  "mongodb+srv://Reinard69:2VST4I57LKReV2GX@cluster0.ikfsktd.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(8080))
  .catch((err) => console.log(err));

// routes
app.use(authRoutes);
app.use(taskRoutes);
app.get("/smoothies", requireAuth, (req, res) => {
  res.send(200).json({ msg: "logged in" });
});

// 2VST4I57LKReV2GX
