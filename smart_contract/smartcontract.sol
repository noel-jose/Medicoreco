//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// pragma experimental ABIEncoderV2;
contract SupplyChain{
 
   struct Product{
       address creator;
       string productName;
       uint256 productId;
       string date;
       string[] states;
       string[] dates;
       string filecid;
   }
 
   mapping(uint256 => Product) allProducts;
   uint256 totalItems = 0;
   //"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "iwatch 2", "2000"
   function addItem(address _creator, string memory _productName, string memory _date, string memory _filecid) public returns(uint256){
       string[] memory _states;
       string[] memory _dates;
       Product memory newProduct = Product({creator: _creator,productName: _productName,productId: totalItems, date : _date, states : _states, dates:_dates, filecid:_filecid});
       allProducts[totalItems] = newProduct;
       totalItems++;
       return totalItems;
   }
 
   function getItem(uint256 _productId) public view returns(Product memory p){
       return allProducts[_productId];
   }
   function getPid() public view returns(uint256){
       return totalItems-1;
   }
   function updateItemLocation(uint256 _productId,string memory _state, string memory _date) public returns(bool){
        allProducts[_productId].states.push(_state);
        allProducts[_productId].dates.push(_date);
       return true;
   }
}