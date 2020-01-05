const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');


router.post('/', async (req, res, next) => {
    try {
        let body = req.body;
        
        let user = await User.findOne( { username: body.username } );
        if(!user){
            res.status(401).json( { error: 'Invalid Username' } );
            return;
        }
        let passwordCorrect = await bcrypt.compare(body.password, user.passwordHash);
        if(!passwordCorrect){
            res.status(401).json( { error: 'Invalid Password' });
            return;
        }

        let payload = {
            username: user.username,
            id: user.id
        };

        let token = jwt.sign(payload, process.env.SECRET);
        res.status(200).json({
            token,
            username: user.username,
            id: user.id
        });
    } 
    catch (error) {
        next(error);
    }
});


module.exports = router;
