pragma solidity ^0.5.0;

contract Cobweb {
    // model a bill
    struct Bill {
        uint id;
        uint money;
        address giver;
        address asker;
        bool isTake;
        bool isBack;
        bool isDone;
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
        require(!bills[_id].isTake, "Asker never take money.");
        bills[_id].isTake = true;
        msg.sender.transfer(_money);
    }

    // asker can use this methon to return money
    function backMoney (uint _id) public payable {
        require(msg.value == bills[_id].money, "The money is the same as the money previously registered. ");
        require(msg.sender == bills[_id].asker, "The request was sent by asker.");
        bills[_id].isBack = true;
    }

    // giver can use this methon to callback money
    function healMoney (uint _id, uint _money) public {
        require(_money == bills[_id].money, "The money is the same as the money previously registered. ");
        require(msg.sender == bills[_id].giver, "The request was sent by giver.");
        require(bills[_id].isBack, "Asker had return money.");
        require(!bills[_id].isDone, "Giver never take money.");
        bills[_id].isDone = true;
        msg.sender.transfer(_money);
    }

    // to new a bill
    function _createBill (uint _money, address _giver, address _asker) private {
        billCount ++;
        bills[billCount] = Bill(billCount, _money, _giver, _asker, false, false, false);
    }
}