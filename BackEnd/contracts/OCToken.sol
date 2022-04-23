//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OCToken is ERC20 {
    
    constructor(string memory _name, string memory _symbol) ERC20(_name,_symbol) {
    }

    function createTokens(address _owner, uint32 _amount) public {
        //call mint function
        _mint(_owner,_amount);
    }

    function burnTokens(address _owner, uint32 _amount) public {

        //call mint function
        _burn(_owner,_amount);
    }
}