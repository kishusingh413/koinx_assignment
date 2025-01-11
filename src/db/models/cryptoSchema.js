const mongoose = require("mongoose");

// Define the schema
const cryptoSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Bitcoin, Ethereum, Matic
  priceUSD: { type: Number, required: true },
  marketCapUSD: { type: Number, required: true },
  change24h: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, // Time when data was created
  updatedAt: { type: Date, default: Date.now }, // Time when data was fetched
});

// Build an index on the 'name' field to improve query performance
cryptoSchema.index({ name: 1 }); // 1 for ascending order

// Create the model
const CryptoModel = mongoose.model("Crypto", cryptoSchema);

module.exports = CryptoModel;
