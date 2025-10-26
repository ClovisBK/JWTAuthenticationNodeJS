const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


exports.register = async (req, res) => {
    const {firstName, lastName, email, password, phoneNumber, address, dateOfBirth} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.findByEmail(email, (err, users) => {
        if(users.length)
            return res.status(400).send("User with this email already exists");
        User.createUser({firstName, lastName, email, password:hashedPassword, phoneNumber, address, dateOfBirth}, (err) => {
            if(err)
                return res.status(500).send(err);
            res.status(201).send("Registration Successful");
        });
    });

};

exports.login = (req, res) => {
    const {email, password}  = req.body;

    User.findByEmail(email, async (err, users) => {

        const user = users[0];
        const valid = await bcrypt.compare(password, user.password);
        if(!users.length || !valid)
            return res.status(400).send("Invalid email or password");

        const token = jwt.sign({id:user.id, email:user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    });
}

