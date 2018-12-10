const Request = require("request");
const app = require("../app");

describe("home",function(){
    it('should return 200 on get',function(done){
        Request.get("http://localhost:8080/",function(error,response){
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should fail on POST request', function(done){
        Request.post("http://localhost:8080/", function(error, response){
            expect(response.statusCode).toEqual(404);
            done();
        });
    });    
});