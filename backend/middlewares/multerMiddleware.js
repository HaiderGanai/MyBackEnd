const multer = require("multer");
const { BookFiles } = require("../models/bookFilesModel");
const { Books } = require("../models/booksModel");


//Multer storage configuration
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
      cb(null, '')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + file.originalname);
    }
  });

  //Initializing muler
  const upload = multer({ storage: storage });

  module.exports = upload;