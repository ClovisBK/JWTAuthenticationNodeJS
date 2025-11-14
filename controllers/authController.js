const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require("../Utils/SendEmail");



exports.register = async (req, res) => {
    const {firstName, lastName, email, password, phoneNumber, address, dateOfBirth} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.findByEmail(email, (err, users) => {
        if(users.length)
            return res.status(400).send("User with this email already exists");
        User.createUser({firstName, lastName, email, password:hashedPassword, phoneNumber, address, dateOfBirth}, (err, newUser) => {
            if(err)
                return res.status(500).send(err);

            const token = jwt.sign({id: newUser.id, email: email}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.status(201).json({
                message: "Registration successful",
                token
            });
        });
    });

};

exports.login = (req, res) => {
    const {email, password}  = req.body;

    User.findByEmail(email, async (err, users) => {

        const user = users[0];
        const valid = await bcrypt.compare(password, user.password);
        if(!users.length || !valid)
            return res.status(400).send("Invalid email and Password Combination");

        const token = jwt.sign({id:user.id, email:user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    });
}

exports.forgotPassword = async (req, res) => {
    const {email} = req.body;

    if(!email){
        return res.status(400).json({message: "Email is require"});
    }

    try{
        User.findByEmail(email, async (err, users) => {
            if(err) return res.status(500).json({message: "Database error"});

            const user = users[0];
            if(!user){
                return res.status(200).json({message: "If an account exists, a reset link has been sent to you"});
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            const expiry = new Date(Date.now() + 3600000);
            
            User.setResetToken(email, hashedToken, expiry, async (err) => {
                if(err) return res.status(500).json({message: "Failed to set reset token"});
                
                const resetURL = `https://binvirtualcard.netlify.app/reset-password?token=${resetToken}&email=${email}`;
                const message = `
                    <h3>Password Reset Request </h3>
                    <p>You requested to reset your password. Click the link below to reset it:</p>
                    <a href="${resetURL}" target="_blank">${resetURL}</a>
                    <p>This link will expire in 1 hour. </p>
                `;

                try{
                    await sendEmail({
                        to: email,
                        subject: "Password Reset",
                        html: message
                    });

                    res.status(200).json({message: "A link has been sent to you"});
                }catch(error){
                    console.error("Error sending email", error);
                    res.status(500).json({message: "Failed to send email."});
                }
            })

        })
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}

exports.resetPassword = async (req, res) => {
    const {token, password} = req.body;

    if(!token || !password){
        return res.status(400).json({message: "Token and new password are require"});
    }

    try{
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        User.findByResetToken(hashedToken, async (err, users) => {
            if(err) return res.status(500).json({message: "Database error"});

            const user = users[0];
            if(!user){
                return res.status(400).json({message: "Invalid or expired token"});
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            User.updatePassword(user.email, hashedPassword, (err2) => {
                if(err2) return res.status(500).json({message: "Failed to update password"});

                res.status(200).json({message: "Password reset successful"});
            })
        })  
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}

