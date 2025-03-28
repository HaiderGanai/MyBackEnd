const { sequelize } = require("../config/dbConnect");
const { DataTypes } = require("sequelize");

const UserModel = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    mobileNumber: DataTypes.STRING,
    Status: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetTokenExpiry: { 
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    freezeTableName: true
}
)

module.exports = { UserModel };