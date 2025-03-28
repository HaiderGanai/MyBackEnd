
const { validate } = require('joi');
const { userSchema } = require('../middlewares/userValidation');
const { UserModel } = require('../models/userModel');
//CREATE A USER 
const createUser = async (req, res) => {

    try {

        //validate request
   const {error} =  userSchema.validate(req.body);
   if(error) {
    return res.status(400).json(error.details[0].message)
   }

   const user = await UserModel.create(req.body);
   return res.status(201).json(user);
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

//GET ALL THE USERS
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        return res.status(200).json({users});
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

//GET USER BY ID 
const getUserByID = async (req, res, id) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        return res.status(200).json({user});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

//UPDATE A USER
const updateUser = async (req, res) => {
    try {
        //validate request
   const {error} =  userSchema.validate(req.body);
   if(error) {
    return res.status(400).json(error.details[0].message)
   }

   const user = await UserModel.findByPk(req.params.id);
   if(!user){
    return res.status(404).json({ error: "User not found"});
   }

   await user.update(req.body);
   return res.status(200).json({msg: "User Updated"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

//DELETE A USER
const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        await user.destroy();
            return res.status(200).json({msg: 'User deleted successfully!'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports = { createUser, getUserByID, getUsers, updateUser, deleteUser};