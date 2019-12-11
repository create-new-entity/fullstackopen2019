const app = require('./../app');
const mongoose = require('mongoose');
const test_helpers = require('./../utils/test_helpers');
const user_helpers = require('./../utils/user_helper');
const supertest = require('supertest');
const api = supertest(app);

beforeEach(async () => {
    await test_helpers.initializeDBWithDummyData();
    await user_helpers.inititalizeDBWithDummy_Users();
});

describe('\n\nTests related to GET requests', () => {
    test('GET request retrieves all data', async () => {
        let response = await api.get('/api/blogs');
        expect(response.body.length).toBe(test_helpers.dummyData.length);
    });
});

describe('\n\nTests related to POST requests', () => {

    test('POST request fails for invalid token', async () => {
        await api.post('/api/login')
            .send({
                username: user_helpers.dummyUsers[0].username,
                password: user_helpers.dummyUsers[0].password
            })
            .expect(200);
        // console.log('loginResponseBody', loginResponse.body);
        await api.post('/api/blogs')
            .set('Authorization', 'Bearer ' + 'this_is_an_invalid_token')
            .send(test_helpers.newDummy)
            .expect(401);
    });

    test('POST request successfully stores one additional data', async () => {
        let loginResponse = await api.post('/api/login')
            .send({
                username: user_helpers.dummyUsers[0].username,
                password: user_helpers.dummyUsers[0].password
            })
            .expect(200);
        await api.post('/api/blogs')
            .send(test_helpers.newDummy)
            .set('Authorization', 'Bearer ' + loginResponse.body.token)
            .expect(201);
        let response = await api.get('/api/blogs');
        expect(response.body.length).toBe(test_helpers.dummyData.length+1);
    });

    test('"likes" property is set to 0 if it is missing in POST request data', async () => {
        expect(test_helpers.dummyWithoutLike.likes).not.toBeDefined();
        let loginResponse = await api.post('/api/login')
                                    .send({
                                        username: user_helpers.dummyUsers[0].username,
                                        password: user_helpers.dummyUsers[0].password
                                    })
                                    .expect(200);
        await api.post('/api/blogs')
            .send(test_helpers.dummyWithoutLike)
            .set('Authorization', 'Bearer ' + loginResponse.body.token)
            .expect(201);
        let response = await api.get('/api/blogs');
        let result = response.body.find((blog) => blog.title === 'Yahoo');
        expect(result.likes).toBe(0);
    });

    test('POST request without "title" in data return 400 Bad Request', async () => {
        await api.post('/api/blogs')
            .send(test_helpers.dummyWithoutTitle)
            .expect(400);
    });
});

describe('DELETE request tests', () => {
    test('Delete with an id', async () => {
        let response = await api.get('/api/blogs');
        expect(response.body.length).toBeGreaterThan(0);

        let targetId = response.body[0].id;

        await api.delete(`/api/blogs/${targetId}`)
                .expect(204);

        await api.get(`/api/blogs/${targetId}`)
                .expect(404);
    });
});

describe('PUT request tests', () => {
    test('Update likes of an entry by id', async () => {
        let response = await api.get('/api/blogs');
        expect(response.body.length).toBeGreaterThan(0);

        let targetId = response.body[0].id;
        let likesBeforeUpdate = response.body[0].likes;
        
        await api.put(`/api/blogs/${targetId}`)
                .send({ likes: likesBeforeUpdate + 5 })
                .expect(200);
        
        response = await api.get('/api/blogs');
        let found = response.body.find((blog) => blog.id === targetId);
        expect(found.likes - 5).toBe(likesBeforeUpdate);
    });
});

describe('\n\nTests related to data properties', () => {
    test('Unique id property is defined as "id"', async () => {
        let response = await api.get('/api/blogs');
        expect(response.body[0].id).toBeDefined();
    });
});


afterAll(() => {
    mongoose.connection.close();
});