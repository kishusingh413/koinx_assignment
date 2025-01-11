const express = require("express");
const {
  fetchCryptoDataByName,
  fetchAllCryptoDataByName,
  calculateDeviation,
} = require("../controller/crypto/cryptoData");
//crypto routes
const cryptoRouter = express.Router();

cryptoRouter
  .route("/stats")
  .get(async (req, res) => {
    res.status(200).send("Crypto Stats");
    return;
  })
  .post(async (req, res) => {
    const coin_name = req.body.coin;
    if (!coin_name) {
      return res.status(400).send("Coin name is required");
    }
    latest_coin_data = await fetchCryptoDataByName(coin_name);
    if (!latest_coin_data) {
      return res.status(404).json({ message: "Coin not found" });
    }
    res.status(200).json({
      data: latest_coin_data,
      message: "Coin data retrieved successfully",
    });
  });

cryptoRouter.route("/deviation").post(async (req, res) => {
  try {
    const coin_name = req.body.coin;
    if (!coin_name) {
      return res.status(400).send("Coin name is required");
    }
    let coin_data = await fetchAllCryptoDataByName(coin_name);
    if (coin_data.length === 0) {
      return res.status(404).json({ message: "Coin not found" });
    }
    // take last 100 data points
    coin_data = coin_data.slice(-100);
    const deviation = calculateDeviation(coin_data);
    res.status(200).json({
      data: deviation,
      message: "Deviation calculated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error while calculating standard deviation",
    });
  }
});

module.exports = cryptoRouter;
