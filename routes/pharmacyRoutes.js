const express = require("express");
const router = express.Router();
const Pharmacy = require("../models/pharmacyModel");
const User = require("../models/userModel");
const pharmacyController = require("../controllers/pharmarcyController");

router.post("/register-pharmacy", pharmacyController.registerPharmacy);
// router.post("/register-pharmacy", (req, res) => {
//     const userId = req.user.id;
//     const {name, licence_number, address_street, address_city, phone_number} = req.body;
//     if(!name || !licence_number || !address_city || !address_street || !phone_number){
//         return res.status(400).json({message:"All fields are required"});
//     }

//     Pharmacy.createPharmacy({name, licence_number, address_street, address_city, phone_number}, (err, result) =>{
//         if(err){
//             return res.status(500).json({message: "Database error for creating pharmacy"});
//         }

//         const pharmacyId= result.insertId;

//         User.linkPharmacyToUser(userId, pharmacyId, (err) => {
//             if(err){
                
//                 return res.status(500).json({message: "failed to link pharmacy to user"});
//             }
//             res.status(201).json({
//                 message: "Pharmacy registered successfully",
//                 pharmacy_id: pharmacyId
//             });
//         });
//     });
   
// });

module.exports = router;
