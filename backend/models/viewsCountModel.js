const { sequelize } = require("../config/dbConnect");
const { DataTypes } = require("sequelize");

const ViewsCount = sequelize.define('Views', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timeviewed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = { ViewsCount };