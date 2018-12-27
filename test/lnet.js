var LNet = artifacts.require("./LNet.sol");

contract("LNet", function () {
    var addressList;

    it("Connect the blockchain and find the address.", function () {
        return web3.eth.getAccounts().then(function (i) {
            addressList = i;
            return addressList;
        }).then(function (ads) {
            assert.equal(ads.length, 20, "Found 20 addresses.");
        })
    });
});