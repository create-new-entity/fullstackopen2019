const app = require('./../app');
const mongoose = require('mongoose');
const test_helpers = require('./../utils/test_helpers');
const supertest = require('supertest');
const api = supertest(app);

beforeEach(async () => {
    await test_helpers.initializeDBWithDummyData();
});

describe('\n\nTests related to GET requests', () => {
    test('GET request retrieves all data', async () => {
        let response = await api.get('/api/blogs');
        expect(response.body.length).toBe(test_helpers.dummyData.length);
    });
});

describe('\n\nTests related to POST requests', () => {
    test('POST request successfully stores one additional data', async () => {
        await api.post('/api/blogs')
            .send(test_helpers.newDummy);
        let response = await api.get('/api/blogs');
        expect(response.body.length).toBe(test_helpers.dummyData.length+1);
    });

    test('"likes" property is set to 0 if it is missing in POST request data', async () => {
        expect(test_helpers.dummyWithoutLike.likes).not.toBeDefined();
        await api.post('/api/blogs')
            .send(test_helpers.dummyWithoutLike);
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

describe('\n\nTests related to data properties', () => {
    test('Unique id property is defined as "id"', async () => {
        let response = await api.get('/api/blogs');
        expect(response.body[0].id).toBeDefined();
    });
});


afterAll(() => {
    mongoose.connection.close();
});