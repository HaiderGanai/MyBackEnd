const { UserModel } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { error } = require('console');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ where: { email } });

        // Check if the user exists and the password matches
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token with user ID and status (role)
        const token = jwt.sign(
            { userId: user.id, status: user.Status },  // User ID and role are added to the payload
            'qwerty',                      // Your JWT secret key (replace with your secret)
            { expiresIn: '1h' }                        // Token expiration (e.g., 1 hour)
        );

        // Respond with the token
        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//user sign up
const signUp = async (req, res) => {

    try {
        const { firstName, lastName, email, password, age, mobileNumber } = req.body;

        const existUser = await UserModel.findOne({ where: {email}})
        if(existUser){
           return res.status(400).json({error: "User already exists"});
        }
        
        const userCreated = await UserModel.create({
            firstName,
            lastName,
            email,
            password,
            age,
            mobileNumber
        });

        res.status(200).json({message: "User Created", userCreated});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        //check if the user exists
        const user = await UserModel.findOne({ where:{ email}});
        if(!user){
            return res.status(404).json({error: "User not found" });
        }

        //Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 15 *60 * 1000; // 15 minutes


        //save the reset token and expiry to the user model
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        //set up nodmailer to send the email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'haider03484887745@gmail.com',
                pass: 'rcce umcz ynwp zsvy'
            }
        });

        const mailOptions = {
            from: 'haider03484887745@gmail.com',
            to: email,
            subject: 'Password Reset Link',
            text: `Use the following token to reset the pasword:${resetToken}. This token is valid for 15 minutes`
        }

        // send the email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset token sent via email'})


    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
};

// rest password

const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword} = req.body;

        //Find the user with the reset token
        const user = await UserModel.findOne({ where: { resetToken}});
        if(!user || user.resetTokenExpiry<Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired token'})
        }

        //Update the password and clear the rest token
        user.password = newPassword;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        return res.status(200).json({ message: 'Password has been reset successfully'});
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}


module.exports = { login, signUp, forgotPassword, resetPassword };
