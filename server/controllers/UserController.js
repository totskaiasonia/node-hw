import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
    try {
        const checkUser = await UserModel.findOne({name: req.body.name});
        if (checkUser)
            return res.status(409).json({msg: "Already registered"});
        
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new UserModel({
            name: req.body.name,
            passwordHash: hash
        });
        await user.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "Phrase123",
            {
                expiresIn: '12h',
            }
        );

        res.status(200).json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to sign up"});
    }
    
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({name: req.body.name});
        if (!user)
            return res.status(404).json({msg: "User not found"})
        if (!await bcrypt.compare(req.body.password, user._doc.passwordHash))
            return res.status(400).json({msg: "Incorrect password",})

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'Phrase123',
            {
                expiresIn: '12h',
            }
        );

        res.status(200).json(token);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Failed to log in"});
    }
};
