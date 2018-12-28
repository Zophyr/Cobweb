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

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App.contracts.Cobweb.deployed().then(function (i) {
      cobInstance = i;
      return cobInstance.billCount()
    }).then(function (billCount) {
      console.log(billCount.toNumber());
      var billResults = $('#billResults');
      billResults.empty();

      if (billCount == 0) {
        var billTemplate = "<tr><th>" + '-' + "</th><td>" + '-' + "</td><td>" + '-' + "</td><td>" + '-' + "</td></tr>"
        billResults.append(billTemplate);
      }
      else {
        for (var i = 1; i <= billCount; i++) {
          console.log(i);
          cobInstance.bills(i).then(function (bill) {
            console.log('get bill: ' + i);
  
            var billId = bill[0];
            var billMoney = bill[1];
            var billGiver = bill[2];
            var billAsker = bill[3];
  
            console.log(billId + " " + billMoney + " " + billGiver + " " + billAsker);
  
            var billTemplate = "<tr><th>" + billId + "</th><td>" + billMoney + "</td><td>" + billGiver + "</td><td>" + billAsker + "</td></tr>"
            billResults.append(billTemplate);
          })
        }
      }
      
      loader.hide();
      content.show();
    })
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});