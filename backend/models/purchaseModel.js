const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");

const Purchases = sequelize.define('purchases', {
    purchaseDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    paymentIntentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending"
    },
});

module.exports = { Purchases };