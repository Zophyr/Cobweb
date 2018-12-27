var LNet = artifacts.require("./LNet.sol");

contract("LNet", function () {
    var lnetInstance;

    var addressList;

    var ETHUNIT = 1000000000000000000;

    // string input!!
    function toETH(input) {
        return web3.utils.toWei(input, 'ether');
    }

    it("find address", function () {
        return web3.eth.getAccounts().then(function (i) {
            addressList = i;
            return addressList;
        }).then(function (ads) {
            assert.equal(ads.length, 20, "fucking ok?");
        })
    });

    it("initializes with two bills", function () {
        return LNet.deployed().then(function (i) {
            lnetInstance = i;
            lnetInstance.createBill(toETH('111'), addressList[1], addressList[2], {
                from: addressList[1],
                value: toETH('111')
            });
            lnetInstance.createBill(toETH('222'), addressList[3], addressList[4], {
                from: addressList[3],
                value: toETH('222')
            });
            return lnetInstance.bills(1);
        }).then(function (bill) {
            assert.equal(bill[0], 1, "contains the correct id");
            assert.equal(bill[1], toETH('111'), "contains the correct money");
            assert.equal(bill[2], addressList[1], "contains the correct giver");
            assert.equal(bill[3], addressList[2], "contains the correct asker");
            return lnetInstance.bills(2);
        }).then(function (bill) {
            assert.equal(bill[0], 2, "contains the correct id");
            assert.equal(bill[1], toETH('222'), "contains the correct money");
            assert.equal(bill[2], addressList[3], "contains the correct giver");
            assert.equal(bill[3], addressList[4], "contains the correct asker");
        });
    });

    it("try take money", function () {
        return LNet.deployed().then(function (i) {
            lnetInstance = i;
            return lnetInstance.takeMoney(1, toETH('111'), {
                from: addressList[2]
            });
        }).then(function (result) {
            assert.equal(1, 1, "fuck?");
        })
    })

    it("try back money", function () {
        return LNet.deployed().then(function (i) {
            lnetInstance = i;
            return lnetInstance.backMoney(1, {
                from: addressList[2],
                value: toETH('111')
            })
        }).then(function(result) {
            assert.equal(2, 2, "dick?");
        })
    })

    it("try heal money", function () {
        return LNet.deployed().then(function (i) {
            lnetInstance = i;
            return lnetInstance.healMoney(1, toETH('111'), {
                from: addressList[1]
            });
        }).then(function (result) {
            assert.equal(3, 3, "fuck?");
        })
    })
});