var LNet = artifacts.require("./LNet.sol");

contract("LNet", function() {
    var lnetInstance;
    
    it("initializes with two bills", function() {
        return LNet.deployed().then(function(i) {
            return i.billCount();
        }).then(function(count) {
            assert.equal(count, 2);
        });
    });

    it("it initializes the bills with the correct values", function() {
        return LNet.deployed().then(function(i) {
            lnetInstance = i;
            return lnetInstance.bills(1);
        }).then(function(bill) {
            assert.equal(bill[0], 1, "contains the correct id");
            assert.equal(bill[1], 1, "contains the correct money");
            assert.equal(bill[2], 0xEf07122bbf3A2DCcc4085E83650bA781F4Db4AE7, "contains the correct giver");
            assert.equal(bill[3], 0x62a9367Ae2ff42B7b58c9DF7a7572c09816F4196, "contains the correct asker");
            return lnetInstance.bills(2);
        }).then(function(bill) {
            assert.equal(bill[0], 2, "contains the correct id");
            assert.equal(bill[1], 3, "contains the correct money");
            assert.equal(bill[2], 0xa3E60385738e626BD09F79FAd5151D41dB8E6034, "contains the correct giver");
            assert.equal(bill[3], 0x5c922c7aF44FA622AD759B2829422CAa4a6f6677, "contains the correct asker");
        })
    })
});