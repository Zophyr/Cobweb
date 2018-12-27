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
        require(msg.value == _money, "The money is the same as the money previously registered. ");
        require(msg.sender == _giver, "The request was sent by giver.");
        _createBill(_money, _giver, _asker);
    }

    // asker can use this methon to get money
    function takeMoney (uint _id, uint _money) public {
        require(_money == bills[_id].money, "The money is the same as the money previously registered. ");
        require(msg.sender == bills[_id].asker, "The request was sent by asker.");
        msg.sender.transfer(_money);
    }

    // to new a bill
    function _createBill (uint _money, address _giver, address _asker) private {
        billCount ++;
        bills[billCount] = Bill(billCount, _money, _giver, _asker);
    }
}