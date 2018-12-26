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

    uint public billCount;

    constructor () public {
        _createBill(1, 0xEf07122bbf3A2DCcc4085E83650bA781F4Db4AE7, 0x62a9367Ae2ff42B7b58c9DF7a7572c09816F4196);
        _createBill(3, 0xa3E60385738e626BD09F79FAd5151D41dB8E6034, 0x5c922c7aF44FA622AD759B2829422CAa4a6f6677);
    }

    uint bitch;

    function giveMoney () public payable{
        // address(msg.sender).transfer(msg.value);
        bitch = msg.value;
    }

    

    function takeMoney(uint _money) public payable{
        msg.sender.transfer(_money * 1000000000000000000);        
        // bills[_id](3).transfer(_money);
    }

    function getBitch() public view returns(uint) {
        return bitch;
    }

    function _createBill (uint _money, address _giver, address _asker) private {
        billCount ++;
        bills[billCount] = Bill(billCount, _money, _giver, _asker);
    }
}