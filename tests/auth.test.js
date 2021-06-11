var request = require('supertest');
var app = require('../server');
var server = request.agent('http://localhost:3000');


describe('Test Authentication', function(){
    it('Test Auth Path Without Login', function(done){
    server
        .get('/user')  
        //Expect Redirect                     
        .expect(302)
        .end(function(err, res){
            if (err) return done(err);
            console.log(res.body);
            done()
        });
    });
    it('Test Login Functions', loginUser());
    it('Ensure Path is only accessible once Authenticated', function(done){
    server
        .get('/user')                       
        .expect(200)
        .end(function(err, res){
            if (err) return done(err);
            console.log(res.body);
            done()
        });
    });
});


function loginUser() {
    return function(done) {
        server
            .post('/login')
            .send({ username: 'jest@test.com', password: 'test' })
            .expect(302)
            .expect('Location', '/')
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
};