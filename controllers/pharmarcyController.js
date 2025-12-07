const User = require("../models/userModel");
const Pharmacy = require("../models/pharmacyModel");

exports.registerPharmacy = (req, res) => {
    const userId = req.user.id;
    const {name, licence_number, address_street, address_city, phone_number}  = req.body;

    if(!name || !licence_number || !address_city || !address_street || !phone_number){
        return res.status(400).json({message: "All fields are required"});
    }
    User.getUserPharmacy(userId, (err, result) => {
        if(err)
            return res.status(500).json({message: "Database error"});
        if(result && result[0] && result[0].pharmacy_id){
            return res.status(403).json({message: "You already have a registered pharmacy"});
        }
        Pharmacy.createPharmacy(
            {name, licence_number, address_street, address_city, phone_number}, (err, result) =>{
                if(err){
                    console.log("Insertion error", err);
                    return res.status(500).json({message: "Database error creating pharmacy"});
                }
                const pharmacyId = result.insertId;

                User.linkPharmacyToUser(userId, pharmacyId, (err) => {
                    if(err){
                        return res.status(500).json({message: "Failed to link pharmacy to user"});
                    }
                    return res.status(200).json({
                        message: "Pharmacy registered successfully",
                        pharmacy_id: pharmacyId
                    });
                });

            }
        );

    });
};