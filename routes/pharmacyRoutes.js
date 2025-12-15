const express = require("express");
const router = express.Router();
const Pharmacy = require("../models/pharmacyModel");
const User = require("../models/userModel");
const pharmacyController = require("../controllers/pharmarcyController");

router.post("/register-pharmacy", pharmacyController.registerPharmacy);
module.exports = router;
