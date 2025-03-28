const { sequelize } = require("../config/dbConnect");
const { DataTypes } = require("sequelize");

const Books = sequelize.define('Books', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalViews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = { Books }