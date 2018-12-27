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

    // App.contracts.LNet.deployed().then(function (i) {
    //   lnetInstance = i;
    //   web3.eth.getAccounts().then(function (i) {
    //     addressList = i;
    //     return addressList;
    //   }).then(function (thelist) {
    //     lnetInstance.createBill(toETH('111'), addressList[1], addressList[2], {
    //       from: addressList[1],
    //       value: toETH('111')
    //     });
    //     lnetInstance.createBill(toETH('222'), addressList[3], addressList[4], {
    //       from: addressList[3],
    //       value: toETH('222')
    //     });
    //     return lnetInstance.billCount();
    //   }).then(function (billCount) {
    //     console.log(billCount);
    //   })
    // })

    App.contracts.LNet.deployed().then(function (i) {
      lnetInstance = i;
      return lnetInstance;
    }).then(function (ins) {
      addressList = web3.eth.accounts;
      console.log(addressList);
      return lnetInstance.createBill(111, '0x6dCAEab87D9CC0723f61692A60943b585160ab73', '0x6dCAEab87D9CC0723f61692A60943b585160ab73', {
        from: '0x6dCAEab87D9CC0723f61692A60943b585160ab73',
        value: 111
      })
      // return lnetInstance.billCount()
    }).then(() => {
      return lnetInstance.billCount();
    }).then ((billCount) => {
      console.log(billCount.toNumber());
    });


    // Load contract data
    // App.contracts.LNet.deployed().then(function(instance) {
    //   lnetInstance = instance;
    //   return lnetInstance.billCount();
    // }).then(function(billCount) {
    //   console.log(billCount.toNumber());
    //   var candidatesResults = $("#candidatesResults");
    //   candidatesResults.empty();

    //   var candidatesSelect = $('#candidatesSelect');
    //   candidatesSelect.empty();

    //   for (var i = 1; i <= billCount; i++) {
    //     lnetInstance.bills(i).then(function(candidate) {
    //       var id = candidate[0];
    //       var name = candidate[1];
    //       var voteCount = candidate[2];

    //       // Render candidate Result
    //       var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
    //       candidatesResults.append(candidateTemplate);

    //       // Render candidate ballot option
    //       // var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
    //       // candidatesSelect.append(candidateOption);
    //     });
    //   }

    //   loader.hide();
    //   content.show();
    //   // return lnetInstance.voters(App.account);
    // }).catch(function(error) {
    //   console.warn(error);
    // });
  },

  //   castVote: function() {
  //     var candidateId = $('#candidatesSelect').val();
  //     App.contracts.LNet.deployed().then(function(instance) {
  //       return instance.vote(candidateId, { from: App.account });
  //     }).then(function(result) {
  //       // Wait for votes to update
  //       $("#content").hide();
  //       $("#loader").show();
  //     }).catch(function(err) {
  //       console.error(err);
  //     });
  //   }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});