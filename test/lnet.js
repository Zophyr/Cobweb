var LNet = artifacts.require("./LNet.sol");

contract("LNet", function () {
    var addressList;

    var lnetInstance;

    // the input must is stirng type.
    function toETH(input) {
        return web3.utils.toWei(input, 'ether');
    }

    it("Connect the blockchain and find the address.", function () {
        return web3.eth.getAccounts().then(function (i) {
            addressList = i;
            return addressList;
        }).then(function (ads) {
            assert.equal(ads.length, 20, "Found 20 addresses.");
        })
    });

    it("Create two bills.", function () {
        return LNet.deployed().then(function (i) {
            lnetInstance = i;
            lnetInstance.createBill(toETH('1'), addressList[1], addressList[2], {
                from: addressList[1],
                value: toETH('1')
            });
            lnetInstance.createBill(toETH('10'), addressList[3], addressList[4], {
                from: addressList[3],
                value: toETH('10')
            });
            return lnetInstance.bills(1);
        }).then(function (bill) {
            assert.equal(bill.id, 1, "contains the correct id");
            assert.equal(bill.money, toETH('1'), "contains the correct money");
            assert.equal(bill.giver, addressList[1], "contains the correct giver");
            assert.equal(bill.asker, addressList[2], "contains the correct asker");
            return lnetInstance.bills(2);
        }).then(function (bill) {
            assert.equal(bill.id, 2, "contains the correct id");
            assert.equal(bill.money, toETH('10'), "contains the correct money");
            assert.equal(bill.giver, addressList[3], "contains the correct giver");
            assert.equal(bill.asker, addressList[4], "contains the correct asker");
        });
    });
});