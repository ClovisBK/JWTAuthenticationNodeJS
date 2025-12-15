const User = require("../models/userModel");
const Drug = require("../models/drugModel");
const { json } = require("express");

exports.seeAllDrugsForPharmacy = (req, res) =>{
    const userId = req.user.id;
    User.getPharmacyByUser(userId, (err, result) => {
        if(err)
            return res.status(400).json({message: "Couldn't get all drugs"});
        if(!result[0].pharmacy_id)
            return res.status(403).json({message: "You only have access to your drugs"});

        Drug.getAllDrugs((err, result) =>{
            if(err)
                return res.status(500).send(err);
            res.json(result);
        })
    });
}

exports.createDrug = (req, res) => {
    const userId = req.user.id;
 const   {name, generic_name, dosage_form, unit_price, quantity_available, description}  = req.body;
 if(!name || !dosage_form || !unit_price || !quantity_available || !description){
    return res.status(400).json({message: "All fields required"});
 }
 User.getPharmacyByUser(userId, (err, result) => {
    if(err)
        return res.status(500).json({message: "Database error"});
    if(!result || !result[0] || !result[0].pharmacy_id){
        return res.status(403).json({message: "Register a pharmacy first"});
    }
    const PharmacyId = result[0].pharmacy_id;
    Drug.addDrug({name, generic_name, dosage_form, unit_price, quantity_available, description, pharmacy_id:PharmacyId}, (err) =>{
        if(err)
            return res.status(500).json({message: "Error adding drug"});
        return res.status(201).json({message: "Drug added successfully"});
    })
 })
}