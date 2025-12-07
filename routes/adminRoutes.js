const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const verifyToken = require("../middleware/middleware");
const authorize = require("../middleware/roleMiddleware");


router.put("/set-role", (req, res) => {
    try{

        const {email, role} = req.body;
    
        if(!email || !role)
            return res.status(400).json("Email and role required");

        Users.findByEmail(email, (err, user) => {
            if(err) 
                return res.status(500).json({message: "database error"});

            if(!user) 
                return res.status(404).json({message: "User with that email doesn't exist."});
        })
    
        Users.updateUserRole(email, role, (err) => {
            if(err) return res.status(500).send("Database Error");
            res.status(200).json({message: `User role update to ${role}`});
        });
        
    }catch(error){
       return res.status(403).json("Error occured while setting role");
    }
});

module.exports = router;