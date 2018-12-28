App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    hasVoted: false,

    init: function () {
        return App.initWeb3();
    },

    // ! do not need to change.
    initWeb3: function () {
        // TODO: refactor conditional
        if (typeof web3 !== 'undefined') {
            // If a web3 instance is already provided by Meta Mask.
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // Specify default instance if no web3 instance provided
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            web3 = new Web3(App.web3Provider);
        }
        return App.initContract();
    },

    initContract: function () {
        $.getJSON("Cobweb.json", function (cobweb) {
            // Instantiate a new truffle contract from the artifact
            App.contracts.Cobweb = TruffleContract(cobweb);
            // Connect provider to interact with contract
            App.contracts.Cobweb.setProvider(App.web3Provider);

            return App.render();
        });
    },

    render: function () {
        var cobInstance;
        var addressList;
        var loader = $("#loader");
        var content = $("#content");

        loader.hide();
        content.show();

        // Load account data
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your Account: " + account);
            }
        });
    },

    backMoney: function () {
        console.log("backMoney");
        var backIdInput = $('#backIdInput').val();
        var backMoneyInput = $('#backMoneyInput').val();
    
        App.contracts.Cobweb.deployed().then(function (i) {
          cobInstance = i;
          return cobInstance.backMoney(backIdInput, {
            from: App.account,
            value: backMoneyInput
          });
        }).then(function (result) {
          App.render();
        });
      },
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});