// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract HealthApp {
    struct Memo {
        string name;
        string message;
        uint256 timestamp;
        address from;
        uint256 amount;
    }

    Memo[] public memos;
    address payable owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = payable(msg.sender);
    }

    function main(string calldata name, string calldata message) external payable {
        require(msg.value > 0, "Please send some ether");

        owner.transfer(msg.value);
        balances[msg.sender] += msg.value;
        memos.push(Memo(name, message, block.timestamp, msg.sender, msg.value));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }
}