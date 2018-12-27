pragma solidity ^0.5.0;

contract LNet {
    // model a bill
    struct Bill {
        uint id;
        uint money;
        address giver;
        address asker;
        // bool isTake;
        // bool isBack;
        // bool isDone;
    }

    // store bills
    // fetch bills
    mapping(uint => Bill) public bills;

    uint public billCount;

    function createBill (uint _money, address _giver, address _asker) public payable {
        require(msg.value == _money, "Giver money whether enought");
        require(msg.sender == _giver, "address right?");
        _createBill(_money, _giver, _asker);
    }

    function takeMoney (uint _id, uint _money) public {
        require(_money == bills[_id].money, "fuck ok?");
        require(msg.sender == bills[_id].asker, "address ok?");
        msg.sender.transfer(_money);
    }

    function backMoney (uint _id) public payable {
        require(msg.value == bills[_id].money, "back right money?");
        require(msg.sender == bills[_id].asker, "address ok?");
    }

    function healMoney (uint _id, uint _money) public {
        require(_money == bills[_id].money, "fuck ok?");
        require(msg.sender == bills[_id].giver, "address ok?");
        msg.sender.transfer(_money);
    }

    function _createBill (uint _money, address _giver, address _asker) private {
        billCount ++;
        bills[billCount] = Bill(billCount, _money, _giver, _asker);
    }
}