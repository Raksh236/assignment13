const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productsRouter = require("./routes/products");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/product", productsRouter);

app.get("/", (req, res) => {
  res.send("Assignment 13 Inventory API is running.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
