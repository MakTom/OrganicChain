//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./OCToken.sol";

contract OrganicChain is AccessControl {

    bytes32 public constant FARMER_ROLE = keccak256("FARMER");
    bytes32 public constant INVESTOR_ROLE = keccak256("INVESTOR");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER");

    OCToken public token;
    address public OrganicChainAdmin;
    struct User {
        string  name;
        string  role;
    }

    struct Farm {
        uint32 areaCovered;
        uint8 tokenpercent;
        string cropName;
    }

    address [] userList;
    mapping (address => User) public users;
    mapping (address => Farm[]) public farms;

    // Events
    event userCreated(address _useraddr, string _name, string _role);
    event farmAdded(address _useraddr, uint32 _areacovered);

    constructor(){
        OrganicChainAdmin = msg.sender;
        token = new OCToken("OCT", "OCT");
    }
    function searchUser( address _userAddress) public view returns ( bool, User memory){
        bool found = false;
        for(uint16 i=0; i < userList.length; i++){
            if(userList[i] == _userAddress)
            {
                found = true;
                break;
            }
        }
        return (found,users[_userAddress]);
    }

    function createUser( 
        string memory  _name,
        address _userAddress,
        string memory  _role)
        public {

            userList.push(_userAddress);
            users[_userAddress].name = _name;
            users[_userAddress].role = _role;
            if(keccak256(abi.encodePacked(_role)) == FARMER_ROLE)
                _setupRole(FARMER_ROLE, _userAddress);
            else if(keccak256(abi.encodePacked(_role)) == INVESTOR_ROLE)
                _setupRole(INVESTOR_ROLE, _userAddress);
            else if(keccak256(abi.encodePacked(_role)) == CONSUMER_ROLE)
                _setupRole(CONSUMER_ROLE, _userAddress);

            emit userCreated(_userAddress, _name,_role);
    }

    function addFarm(
        address _userAddress,
        uint32 _areaCovered,
        string memory _cropName,
        uint8 _tokenpercent) 
        public
        {
            Farm memory farm;
            farm.areaCovered = _areaCovered;
            farm.cropName = _cropName;
            farm.tokenpercent = _tokenpercent;
            farms[_userAddress].push(farm);
            uint32 farmToken = _areaCovered * 10;

            token.createTokens(OrganicChainAdmin, farmToken * _tokenpercent/100);
            token.createTokens(_userAddress, farmToken * (100 - _tokenpercent)/100);
            emit farmAdded(_userAddress, _areaCovered);
    }
    function balance(address _userAddress) view public returns (uint256 ){
            return  token.balanceOf(_userAddress);
    }
    function getMyFarms(address _userAddress) view public returns (Farm [] memory ){
            return farms[_userAddress];
    }

}