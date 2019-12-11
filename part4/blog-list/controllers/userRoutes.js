const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const user_helpers = require('../utils/user_helper');

router.get('/', async (req, res, next) => {
    try {
        let allUsers = await user_helpers.allUsersInDB();
        res.json(allUsers);
    }
    catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let body = req.body;

        let saltRounds = 10;
        let passwordHash = await bcrypt.hash(body.password, saltRounds);

        let newUser = new User({
            name: body.name,
            username: body.username,
            passwordHash
        });

        let savedUser = await newUser.save();
        res.json(savedUser);
    }
    catch (error) {
        next(error);
    }
});


module.exports = router;