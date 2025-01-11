const CryptoModel = require("../../db/models/cryptoSchema");

// save the current crypto data to the database
const saveCryptoData = async (cryptoData) => {
  try {
    const crypto = new CryptoModel(cryptoData);
    await crypto.save();
  } catch (error) {
    console.error("Error saving crypto data:", error);
    throw error;
  }
};

// Function to fetch the latest data for a specific cryptocurrency
const fetchCryptoDataByName = async (cryptoName) => {
  try {
    const cryptoData = await CryptoModel.findOne({ name: cryptoName }).sort({
      updatedAt: -1,
    }); // Fetch latest by updatedAt
    return cryptoData;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

// Function to fetch all cryptocurrency data for a specific name
const fetchAllCryptoDataByName = async (cryptoName) => {
  try {
    const cryptoData = await CryptoModel.find({ name: cryptoName });
    return cryptoData;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};

// Function to calculate the median of an array
const getMedian = (arr) => {
  const sortedArr = arr.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedArr.length / 2);

  if (sortedArr.length % 2 === 0) {
    return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
  } else {
    return sortedArr[middle];
  }
};

// Function to calculate the standard deviation
const getStandardDeviation = (arr, mean) => {
  const variance =
    arr.map((value) => Math.pow(value - mean, 2)).reduce((a, b) => a + b, 0) /
    arr.length;

  return Math.sqrt(variance);
};

// Main function to calculate mean, median, and standard deviation
const calculateDeviation = (cryptoData) => {
  // Extract prices from the crypto data
  const prices = cryptoData.map((data) => data.priceUSD);

  // Calculate mean
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;

  // Calculate median
  const median = getMedian(prices);

  // Calculate standard deviation
  const stdDeviation = getStandardDeviation(prices, mean);

  return { mean, median, stdDeviation };
};

// export all functions
module.exports = {
  saveCryptoData,
  fetchCryptoDataByName,
  fetchAllCryptoDataByName,
  calculateDeviation,
};

// Example usage
// const { saveCryptoData, fetchCryptoDataByName } = require("./cryptoData");
