/**
 * Created by Andres Monroy (HyveMynd) on 10/29/14.
 */
describe("Project Service", function(){
    describe("Client project", function(){

        describe("create a client project", function(){
            it("should be successful");
            it("has a start date");
            it("has a client name");
            it("has a project name");
            it("has a rid");
        });

        describe("project already exists", function(){
            it("should fail");
            it("has the correct message");
        });
    });

    describe("Internal Project", function(){

        describe("create an internal project", function(){
            it("is successful");
            it("has a start date");
            it("has a project name");
            it("has a rid");
        });

        describe("project already exists", function(){
            it("should fail");
            it("has the correct message");
        });
    });
});