const router = require("express").Router();
const db = require("../models");

router.get("/", async (req, res) => {
    try {
        const bookData = await db.Book.find();

        res.status(200).json(bookData);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post("/api/books", async (req, res) => {
    try {
        const createdBook = await db.Book.create(req.body)

        res.status(200).json(createdBook);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
})

module.exports = router;