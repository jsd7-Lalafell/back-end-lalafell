const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String },
  type: { type: String, required: true },
  spec: { type: String, required: true },
  description: { type: String, required: true },
  createdOn: { type: Date, default: new Date().getTime() },
  addBy: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);
