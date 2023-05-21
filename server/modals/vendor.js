const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  title: {
    type: String
  },
  vendoraccountnumber: {
    type: Number
  },
  bankname: {
    type: String
  }
  
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;