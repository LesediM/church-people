var member = require("../../../src/member/index");
var assert = require("chai").assert;
describe("member/edit.js", function() {
    //arrange
    //act
    //assert
    describe("", function() {
        var getMemberModel = member.getMemberModel;
        it("should have the save function", function() {
            //arange
            //act
            //assert
            assert.isDefined(getMemberModel);
        });
        it("should have the all the properties", function() {
            //arrange
            //act
            var member = getMemberModel();
            //assert
            assert.hasAllKeys(member, [
                "dog",
                "cat"
            ]);
        });
    });
})