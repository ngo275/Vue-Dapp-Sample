pragma solidity ^0.4.25;

contract Counter {
  uint public value = 0;

  event Increment(uint _value);

  function increment() public {
    value++;
    emit Increment(value);
  }
}
