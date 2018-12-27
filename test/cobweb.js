var Cobweb = artifacts.require("./Cobweb.sol");

contract("Cobweb", function () {
    var addressList;

    var cobInstance;

    // the input must is stirng type.
    function toETH(input) {
        return web3.utils.toWei(input, 'ether');
    }

    it("Connect the blockchain and find the address. ", function () {
        return web3.eth.getAccounts().then(function (i) {
            addressList = i;
            return addressList;
        }).then(function (ads) {
            assert.equal(ads.length, 20, "Found 20 addresses.");
        })
    });

    it("Create two bills. ", function () {
        return Cobweb.deployed().then(function (i) {
            cobInstance = i;
            cobInstance.createBill(toETH('1'), addressList[1], addressList[2], {
                from: addressList[1],
                value: toETH('1')
            });
            cobInstance.createBill(toETH('10'), addressList[3], addressList[4], {
                from: addressList[3],
                value: toETH('10')
            });
            return cobInstance.bills(1);
        }).then(function (bill) {
            assert.equal(bill.id, 1, "contains the correct id");
            assert.equal(bill.money, toETH('1'), "contains the correct money");
            assert.equal(bill.giver, addressList[1], "contains the correct giver");
            assert.equal(bill.asker, addressList[2], "contains the correct asker");
            return cobInstance.bills(2);
        }).then(function (bill) {
            assert.equal(bill.id, 2, "contains the correct id");
            assert.equal(bill.money, toETH('10'), "contains the correct money");
            assert.equal(bill.giver, addressList[3], "contains the correct giver");
            assert.equal(bill.asker, addressList[4], "contains the correct asker");
        });
    });

    it("Try to withdraw money by asker. ", function () {
        return Cobweb.deployed().then(function (i) {
            cobInstance = i;
            return cobInstance.takeMoney(1, toETH('1'), {
                from: addressList[2]
            });
        }).then(function (result) {
            return cobInstance.bills(1);
        }).then(function (bill) {
            assert.equal(bill.isTake, true, "contains the money has been taken away");
        });
    });

    it("Try to return money by asker. ", function () {
        return Cobweb.deployed().then(function (i) {
            cobInstance = i;
            return cobInstance.backMoney(1, {
                from: addressList[2],
                value: toETH('1')
            })
        }).then(function (result) {
            return cobInstance.bills(1);
        }).then(function (bill) {
            assert.equal(bill.isBack, true, "contains the money has been return");
        });
    });

    it("Try to callback money by giver. ", function () {
        return Cobweb.deployed().then(function (i) {
            cobInstance = i;
            return cobInstance.healMoney(1, toETH('1'), {
                from: addressList[1]
            });
        }).then(function (result) {
            return cobInstance.bills(1);
        }).then(function (bill) {
            assert.equal(bill.isDone, true, "contains the money has been callback");
        });
    });
});