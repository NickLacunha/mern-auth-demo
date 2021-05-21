const router = require('express').Router();
const db = require("../models");
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        newUser.password = await bcrypt.hash(req.body.password, 10);
        const userData = await db.User.create(newUser);

        //todo: session isn't set up yet
        req.session.save(() => {
            req.session.user_id = userData._id;
            req.session.logged_in = true;
            res.status(200).json({
                user_id: userData._id,
                username: userData.username
            });
        });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await db.User.findOne({ email: req.body.email });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        console.log(req.body.password, userData.password);

        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData._id;
            req.session.logged_in = true;

            res.json({ username: userData.username, user_id: userData._id, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get("/authenticatedUser", (req, res) => {
    if (req.session.logged_in) {
        res.status(200).json({ user_id: req.session.user_id })
    } else {
        res.status(204).end();
    }
})

module.exports = router;
