const User = require('../models/user');
const bcrypt = require('bcrypt');

const dummyUsers = [
    {
        name: 'John',
        username: 'John_Mamba_789',
        password: 'Tor_Baper_Matha'
    },
    {
        name: 'Jack',
        username: 'Jack_Khamba_375',
        password: 'Pang_Pang'
    },
    {
        name: 'Lisbeth',
        username: 'macbeth_lisbeth',
        password: 'jharka_5398'
    }
];

const dummyUser = {
    name: 'Jackson',
    username: 'Jackson_Mackson',
    password: 'jellyBean_5398'
};

const invalidUser = {
    name: 'Joe Pesci',
    username: 'Wise_Guy_Who_Forgot_To_Put_Password'
};


const allUsersInDB = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

const inititalizeDBWithDummy_Users = async () => {
    await User.deleteMany({});
    const saltRounds = 10;
    let promises = dummyUsers.map(async (user) => {
        let newUser = { ...user };
        newUser.passwordHash = await bcrypt.hash(newUser.password, saltRounds);
        delete newUser.password;
        await new User(newUser).save();
    });
    await Promise.all(promises);
};

module.exports = {
    dummyUser,
    invalidUser,
    dummyUsers,
    allUsersInDB,
    inititalizeDBWithDummy_Users
}