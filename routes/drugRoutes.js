const express = require("express");
const router = express.Router();
const drugController = require("../controllers/drugController");

router.post("/add-drug", drugController.createDrug);
router.get("/", drugController.seeAllDrugsForPharmacy);

module.exports = router;