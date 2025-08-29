const request = require('supertest');
const app = require('../../server');

const testServer = request(app);

module.exports = testServer;
