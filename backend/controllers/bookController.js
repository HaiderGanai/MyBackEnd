const { sequelize } = require("../config/dbConnect");
const { BookFiles } = require("../models/bookFilesModel");
const { Books } = require("../models/booksModel");
const { UserModel } = require("../models/userModel");
const { ViewsCount } = require("../models/viewsCountModel");


//GET ALL BOOKS
const getBooks = async (req, res) => {
    try {
        const books = await Books.findAll();
        return res.status(200).json({ books });
    } catch (error) {
        return res.status(400).json({ error: error.message})
    }
}

//GET BOOK BY ID
const getBookByID = async(req, res) => {
    try {
        const book = await Books.findByPk(req.params.id, {
            attributes: {
                include:   [
                        [sequelize.fn('SUM', sequelize.col('views.timeviewed')), 'totalTimeViewed']
                    
                ]
            },
            include: [
                {
                    // model: ViewsCount,
                    attributes: []
                },{
                    association: 'users'
                }
            ]
        })

        if(!book) {
            return res.status(404).json({ error: "Books not found"})
        }

        if (req.user && req.user.userId) {


            // Check if a view already exists for this user and book
            const existingView = await ViewsCount.findOne({
                where: { userId: req.user.userId, bookId: req.params.id }
            });
        
            // If no existing view, create a new one
            if (!existingView) {
                await ViewsCount.create({
                    userId: req.user.userId,
                    bookId: req.params.id,
                    timeviewed: 1,
                });
            } else {
                // If view exists, update the view count
                await existingView.increment('timeviewed')
            }

            //updating the global totalViews for the book
            await book.increment('totalViews');
        }
        const updatedBook = await Books.findByPk(req.params.id);

        

        return res.status(200).json({ book });
    } catch (error) {
        return res.status(400).json({ error: error.message})
    }
}


// CREATE A BOOK
const createBook = async (req, res) => {
    try {
        // Check if the user is an author
        const user = await UserModel.findByPk(req.user.userId);
        if (user.Status !== 'author') {
            return res.status(403).json({ error: "You are not authorized to create a book" });
        }

        const { title} = req.body;
        const book = await Books.create({ title, authorId: req.user.userId });

        return res.status(201).json({ msg: "Book created successfully", book });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//UPDATE A BOOK
const updateBook = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.user.userId,{
            
        });
        if(user.Status!== 'author') {
            return res.status(403).json({ error: "You are not authorized to update a book"})
        }

        const book = await Books.findByPk(req.params.id);
        if(!book) {
            return res.status(404).json({ error: "Book not found"})
        }

        console.log(book)
        if(book.authorId !== req.user.userId) {
            return res.status(403).json({ error: "You are not the authhor of this book"})
        }

        await book.update(req.body);
        return res.status(200).json({ msg: "Book updated sucessfully", book})
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

//DELETE A BOOK
const deleteBook = async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.user.userId);
        if(user.Status !== 'author') {
            return res.status(403).json({ error: "You are not authorized to delete a book"})
        }

        const book = await Books.findByPk(req.params.id);
        if(!book) {
            return res.status(404).json({ msg: "Book not found"});
        }

        await book.destroy();
        return res.status(200).json({ msg: "Book deleted successfully"})
    } catch (error) {
        return res.status(400).json({ error: error.message})
    }
};


//UPLOAD A BOOK FILE
const uploadBookFile = async (req, res) => {
    try {
        const book = await Books.findByPk(req.params.bookId);
        console.log("Book data coming:", book);  // Log all uploaded files
        // Log the entire request body and file object for debugging
        console.log("Request body:", req.body);
        console.log("Uploaded file:", req.file);
        if(!req.file){
            return res.status(400).json({ error: "No file uploaded" });
        }
        if(!book) {
            return res.status(404).json({ message : "Book not found" });
        }

        const file = await BookFiles.create({
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            fileData: req.file.buffer,
            bookId: req.params.bookId
        });

        res.json({ message: "File uploaded successfully!", file});
    } catch (error) {
        console.error("Error during file upload:", error);  // Log detailed error
        res.status(500).json({ message: "Error uploading file",error})
    }
};

module.exports = { createBook, getBooks, getBookByID, deleteBook, updateBook, uploadBookFile };