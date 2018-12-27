pragma solidity ^0.5.0;

contract LNet {
    // model a bill
    struct Bill {
        uint id;
        uint money;
        address giver;
        address asker;
    }

    // store bills
    // fetch bills
    mapping(uint => Bill) public bills;

    // bill id
    uint public billCount;

    // everyone use to new a bill
    function createBill (uint _money, address _giver, address _asker) public payable {
        require(msg.value == _money, "Giver money whether enought");
        require(msg.sender == _giver, "address right?");
        _createBill(_money, _giver, _asker);
    }

    // to new a bill
    function _createBill (uint _money, address _giver, address _asker) private {
        billCount ++;
        bills[billCount] = Bill(billCount, _money, _giver, _asker);
    }
}