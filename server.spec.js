const request = require("supertest");
const server = require('./server');
const db = require("./data/dbconfig.js");



describe('test server.js', () => {
    it(' should set the testing environment', () => {
        expect(true).toBe(true);
    })
});
    it('Should return the following message', function() {
        return request(server).get('/').then(res => {
            expect(res.body).toEqual({ message: "Server up and running" });
        })
    })


    describe('GET /', function() {
        it('Should return status of 200', function(){
            return request(server).get('/').then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('Should return JSON', function() {
            return request(server).get('/').then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })