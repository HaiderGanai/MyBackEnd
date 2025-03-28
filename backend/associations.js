const { ViewsCount } = require("./models/viewsCountModel");
const { Books } = require("./models/booksModel");
const { UserModel } = require("./models/userModel");
const { Purchases } = require("./models/purchaseModel");
const { BookFiles } = require("./models/bookFilesModel");

// One to Many relationship: A Book has many ViewsCount
Books.hasMany(ViewsCount, {
    foreignKey: 'bookId',
    onDelete: 'CASCADE'
});

// One to Many relationship: A User has many ViewsCount
UserModel.hasMany(ViewsCount, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

// Many to One relationship: A ViewsCount belongs to one Book
ViewsCount.belongsTo(Books, {
    foreignKey: 'bookId',
    onDelete: 'CASCADE'
});

// Many to One relationship: A ViewsCount belongs to one User
ViewsCount.belongsTo(UserModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

UserModel.hasMany(Books, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE'
});

Books.belongsTo(UserModel, {
    foreignKey: 'authorId',
    onDelete: 'CASCADE'
});

// Many to many relationship: many users can have many books purchased
UserModel.belongsToMany(Books, { through: Purchases });
Books.belongsToMany(UserModel, { through: Purchases });

//Relationship between book an bookFile: One to many - A book can have many bookFiles
Books.hasMany(BookFiles, {
    foreignKey: 'bookId',
    onDelete: 'CASCADE'
});

BookFiles.belongsTo(Books, {
    foreignKey: 'bookId',
});

module.exports = () => {};

