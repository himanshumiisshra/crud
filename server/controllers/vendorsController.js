
const Vendor = require("../modals/vendor");

const fetchVendors = async (req, res) => {
  // Find the vendors
  const vendors = await Vendor.find();

  // Respond with them
  res.json({ vendors });
};

const fetchVendor = async (req, res) => {
  // Get id off the url
  const vendorId = req.params.id;

  // Find the vendor using that id
  const vendor = await Vendor.findById(vendorId);


  res.json({ vendor });
};

const createVendor = async (req, res) => {
  // Get the sent in data off request body
  const { title, vendoraccountnumber,bankname } = req.body;


  const vendor = await Vendor.create({
    title,
    vendoraccountnumber,
    bankname,
  });

  res.json({ vendor });
};

const updateVendor = async (req, res) => {
  debugger;
  // Get the id off the url
  const vendorId = req.params.id;
  console.log(vendorId)

  // Get the data off the req body
  const { title,vendoraccountnumber, bankname } = req.body;
  console.log(req.body)


  // Find and update the record
  await Vendor.findByIdAndUpdate(vendorId, {
    title,
    vendoraccountnumber,
    bankname,
  });

  
  const vendor = await Vendor.findById(vendorId);

  // Respond with it
  res.json({ vendor });
};

const deleteVendor = async (req, res) => {
  // get id off url
  const vendorId = req.params.id;

  // Delete the record
  await Vendor.deleteOne({ id: vendorId });

  // Respond
  res.json({ success: "Record deleted" });
};

module.exports = {
  fetchVendors,
  fetchVendor,
  createVendor,
  updateVendor,
  deleteVendor,
};