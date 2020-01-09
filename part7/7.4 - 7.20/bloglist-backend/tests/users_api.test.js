const app = require('./../app');
const supertest = require('supertest');
const api = supertest(app);
const user_helpers = require('./../utils/user_helper');
const mongoose = require('mongoose');

beforeEach(async () => {
    await user_helpers.inititalizeDBWithDummy_Users();
});

describe('\n\nUsers related tests', () => {
    test('Get all users list', async () => {
        let res = await api.get('/api/users');
        expect(res.body.length).toBe(user_helpers.dummyUsers.length);
    });

    test('Create a new user', async () => {
        let res = await api.get('/api/users');
        let allUsersBefore = res.body;
        res = await api.post('/api/users')
                            .send(user_helpers.dummyUser);
        res = await api.get('/api/users');
        let allUsersAfter = res.body;

        expect(allUsersAfter.length).toBe(allUsersBefore.length+1);
    });

    test('Invalid user not created', async () => {
        let res = await api.get('/api/users');
        let allUsersBefore = res.body;
        res = await api.post('/api/users')
                        .send(user_helpers.invalidUser)
                        .expect(422);
        res = await api.get('/api/users');
        let allUsersAfter = res.body;
        expect(allUsersAfter.length).toBe(allUsersBefore.length);
    });

    test('Get all details of one user', async () => {
        let res = await api.get('/api/users');
        let allUsers = res.body;
        let firstUserId = allUsers[0].id;
        res = await api.get('/api/users/' + firstUserId);
        expect(res.body.id).toBe(firstUserId);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
