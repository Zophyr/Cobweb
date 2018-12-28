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
    $.getJSON("LNet.json", function (lnet) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.LNet = TruffleContract(lnet);
      // Connect provider to interact with contract
      App.contracts.LNet.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function () {
    var lnetInstance;
    var addressList;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App.contracts.LNet.deployed().then(function (i) {
      lnetInstance = i;
      return lnetInstance.billCount()
    }).then(function (billCount) {
      console.log(billCount.toNumber());
      var billResults = $('#billResults');
      billResults.empty();

      for (var i = 1; i <= billCount; i++) {
        console.log(i);
        lnetInstance.bills(i).then(function (bill) {
          console.log('get bill');

          var billId = bill[0];
          var billMoney = bill[1];
          var billGiver = bill[2];
          var billAsker = bill[3];

          console.log(billId + " " + billMoney + " " + billGiver + " " + billAsker);

          var billTemplate = "<tr><th>" + billId + "</th><td>" + billMoney + "</td><td>" + billGiver + "</td><td>" + billAsker + "</td></tr>"
          billResults.append(billTemplate);
        })
      }

      loader.hide();
      content.show();
    })
  },

  createBill: function () {
    console.log("createBill");
    var moneyInput = $('#moneyInput').val();
    var giverInput = $('#giverInput').val();
    var askerInput = $('#askerInput').val();

    App.contracts.LNet.deployed().then(function (i) {
      lnetInstance = i;
      return lnetInstance.createBill(moneyInput, giverInput, askerInput, {
        from: App.account,
        value: moneyInput
      })
    }).then(function () {
      App.render();
    })
  },

  takeMoney: function () {
    console.log("takeMoney");
    var takeIdInput = $('#takeIdInput').val();
    var takeMoneyInput = $('#takeMoneyInput').val();

    App.contracts.LNet.deployed().then(function (i) {
      lnetInstance = i;
      return lnetInstance.takeMoney(takeIdInput, takeMoneyInput, {
        from: App.account
      });
    }).then(function (result) {
      App.render();
    });
  },

  backMoney: function () {
    console.log("backMoney");
    var backIdInput = $('#backIdInput').val();
    var backMoneyInput = $('#backMoneyInput').val();

    App.contracts.LNet.deployed().then(function (i) {
      lnetInstance = i;
      return lnetInstance.backMoney(backIdInput, {
        from: App.account,
        value: backMoneyInput
      });
    }).then(function (result) {
      App.render();
    });
  },

  healMoney: function () {
    console.log("healMoney");
    var healIdInput = $('#healIdInput').val();
    var healMoneyInput = $('#healMoneyInput').val();

    App.contracts.LNet.deployed().then(function (i) {
      lnetInstance = i;
      return lnetInstance.healMoney(healIdInput, healMoneyInput, {
        from: App.account
      });
    }).then(function (result) {
      App.render();
    });
  }


};

$(function () {
  $(window).load(function () {
    App.init();
  });
});