pragma solidity ^0.5.0;

contract LNet {
    struct Bill {
        uint id;
        uint money;
        address giver;
        address asker;
    }
}