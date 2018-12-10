const Request = require("request");
const app = require("../app");
const User = require('../models/user');

describe("",function(){

    //This is used to delete the test user
    afterAll(function() {
        User.
        findOne({username: 'testuser'}).remove(function(err){
            if(err){
                console.log("couldn't remove the testuser")
            }
        });
      });

    it('logout should redirect to / when the user is not logged in',function(done){
        Request.get("http://localhost:8080/logout",function(error,response){
            expect(response.request.href).toEqual("http://localhost:8080/");
            done();
        });
    }); 

    it('register a new user',function(done){
        Request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: 'http://localhost:8080/registration',
            form:{
                username: 'testuser',
                password: 'testpassword',
                password2: 'testpassword'
            }
          }, function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
          });
    }); 

    it('login with a new user',function(done){
        Request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: 'http://localhost:8080/login',
            form:{
                username: 'testuser',
                password: 'testpassword'
            }
          }, function(error, response, body){
            expect(response.statusCode).toEqual(200);
            done();
          });
    }); 

});