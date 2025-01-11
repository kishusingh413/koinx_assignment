const axios = require("axios");
const CRYPRO_NAMES = require("../constants/crypto_name");
const CRYPTO_CURRENCY_IDS = require("../enums/crytpo_ids");
const {
  saveCryptoData,
  fetchCryptoDataByName,
} = require("../controller/crypto/cryptoData");

const cron = require("node-cron");
// bitcoin, matic, ethereum

/**
 * Fetches cryptocurrency data from CoinGecko API.
 */
const fetchCryptoData = async () => {
  const url = "https://api.coingecko.com/api/v3/simple/price";
  CRYPTO_ID = [];
  for (const name of CRYPRO_NAMES) {
    CRYPTO_ID.push(CRYPTO_CURRENCY_IDS[name]);
  }
  JOINED_CRYPTO_NAMES = CRYPTO_ID.join(",");
  const params = {
    ids: JOINED_CRYPTO_NAMES,
    vs_currencies: "usd",
    include_market_cap: "true",
    include_24hr_change: "true",
  };

  try {
    const response = await axios.get(url, { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);
    throw error;
  }
};

JOB_STR = "0 */2 * * *";
// JOB_STR = "* * * * * *";
cron.schedule(JOB_STR, async () => {
  try {
    console.log("Cron job executed at:", new Date().toLocaleString());
    cryptoData = await fetchCryptoData();
    for (const name of CRYPRO_NAMES) {
      const data = {
        name: CRYPTO_CURRENCY_IDS[name],
        priceUSD: cryptoData[CRYPTO_CURRENCY_IDS[name]].usd,
        marketCapUSD: cryptoData[CRYPTO_CURRENCY_IDS[name]].usd_market_cap,
        change24h: cryptoData[CRYPTO_CURRENCY_IDS[name]].usd_24h_change,
      };
      console.log("Crypto data to be saved:", data);
      await saveCryptoData(data);
      const fetcheddata = await fetchCryptoDataByName(name);
      console.log("Fetched data:", fetcheddata);
    }
  } catch (error) {
    console.log("Error in cron job", error);
  }
});

module.exports = fetchCryptoData;
