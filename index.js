require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("connected to mongo✅");
});

const authRouth = require("./src/routes/authRoute");
const addressRoute = require("./src/routes/addressRoute");
const paymentRoute = require("./src/routes/paymentRoute");
const productRoute = require("./src/routes/productRoute");
const userRoute = require("./src/routes/userRoute");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//API line
app.get("/", (req, res) => {
  res.json({ data: "respond received from the server!" });
});

//User Authenticate----------------
app.use("/", authRouth);
//User---------------
app.use("/", userRoute);
//Address---------------
app.use("/", addressRoute);
//Payment--------------------
app.use("/", paymentRoute);
//Product-------------------
app.use("/", productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}✅`);
});
