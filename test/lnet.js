var LNet = artifacts.require("./LNet.sol");

contract("LNet", function() {
    var lnetInstance;

    var addressList;

    var ETHUNIT = 1000000000000000000;

    function toETH(input) {
        return input * ETHUNIT;
    }
    
    // web3.eth.getAccounts().then(result => { addressList = result; console.log(addressList);});

    it("find address", function() {
        return web3.eth.getAccounts().then(function(i) {
            addressList = i;
            return addressList;
        }).then(function(ads) {
            console.log(ads);
            assert.equal(ads.length, 10, "fucking ok?");
        })
    });
    
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
    });

    it("try give money", function() {
        return LNet.deployed().then(function(i) {
            lnetInstance = i;
            return lnetInstance.giveMoney({from: addressList[1], value: toETH(10)});
        }).then(function(fuckAdd) {
            lnetInstance.getBitch().then(pig => {
                assert.equal(pig, toETH(10), "ok?");
            })
        })
    })

    it("try take money", function() {
        return LNet.deployed().then(function(i) {
            lnetInstance = i;
            return lnetInstance.takeMoney(10, {from: addressList[2]});
        }).then(function(result) {
            assert.equal(1, 1, "fuck?");
        })
    })
});