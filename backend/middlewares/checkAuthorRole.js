const { UserModel } = require("../models/userModel");

const checkAuthorRole = async (req, res, next) => {
    try {
        if(!req.user || !req.user.userId) {
            return res.status(400).json({ error: "User ID not found in the tojen "})
        }

        const user = await UserModel.findByPk(req.user.userId);

        if(!user) {
            return res.status(404).json({ error: "User not found"});
        }

        if(user.Status !== "author") {
            return res.status(403).json({ error: "You are not authorized to perform this action"});
        }
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { checkAuthorRole };