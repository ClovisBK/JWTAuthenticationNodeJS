const User = require('../models/userModel');

exports.getUsers = (req, res) => {
    User.getAllUsers((err, results) => {
        if(err)
            return res.status(500).send(err);
        res.json(results);
    });
};