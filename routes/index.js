const bookRoutes = require("./bookRoutes")
const userRoutes = require("./userRoutes")
const router = require('express').Router()

router.use("/api/books", bookRoutes);
router.use("/api/users", userRoutes);

module.exports = router;