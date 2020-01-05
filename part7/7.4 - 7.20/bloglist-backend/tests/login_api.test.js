const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('./../app');
const api = supertest(app);
const User = require('./../models/user');
const user_helper = require('./../utils/user_helper');


beforeEach(async () => {
    await User.deleteMany({});
    await user_helper.inititalizeDBWithDummy_Users();
});

describe('Tests related to login', () => {
    test('Invalid username fails login', async () => {
        let aUser = user_helper.dummyUsers[0];
        let res = await api.post('/api/login')
                            .send({
                                username: aUser.username + ' garbage',
                                password: aUser.password
                            })
                            .expect(401);
        expect(res.body.error).toBe('Invalid Username');
    });

    test('Invalid password fails login', async () => {
        let aUser = user_helper.dummyUsers[0];
        let res = await api.post('/api/login')
                            .send({
                                username: aUser.username,
                                password: aUser.password + ' garbage'
                            })
                            .expect(401);
        expect(res.body.error).toBe('Invalid Password');
    });

    test('Correct credentials allows login', async () => {
        let aUser = user_helper.dummyUsers[0];
        let targetUser = await User.findOne( { username: aUser.username });
        let res = await api.post('/api/login')
                            .send({
                                username: aUser.username,
                                password: aUser.password
                            })
                            .expect(200);
        expect(res.body.username).toBe(aUser.username);
        expect(res.body.id).toBe(targetUser.id);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});