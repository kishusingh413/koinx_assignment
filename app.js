const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/db/db");
const fetchCryptoData = require("./src/jobs/cron_job");
const cryptoRouter = require("./src/router/cryptoRouter");
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

app.use("/api", cryptoRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Express server is running!");
});

// Start the Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
