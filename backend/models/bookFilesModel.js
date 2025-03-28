const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnect");

const BookFiles = sequelize.define('bookFiles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileData: {
        type: DataTypes.BLOB("long"),
        allowNull: false
    }
});

module.exports = { BookFiles };