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

        if(!body.name || !body.password || !body.username){
            let error = new Error('Name, Username or Password is missing');
            error.name = 'MissingUserInput';
            throw error;
        }

        if(body.password.length < 3){
            let error = new Error('Password is too short');
            error.name = 'TooShortInput';
            throw error;
        }
        

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