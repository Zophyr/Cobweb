var LNet = artifacts.require("./LNet.sol");

contract("LNet", function() {
    
    it("initializes with two bills", function() {
        return LNet.deployed().then(function(i) {
            return i.billCount();
        }).then(function(count) {
            assert.equal(count, 2);
        });
    });
});