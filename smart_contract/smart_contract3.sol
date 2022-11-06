//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// pragma experimental ABIEncoderV2;
contract PatientManagement{

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
 
   struct Patient{
       address creator;
       string patientName;
       uint256 patientId;
       //string adhaar;
       string date;
       string gender;
       string yearofbirth;
       string patientaddress;
       string mobilenumber;
       string[] treatments;
       string[] dates;
       string[] filecid;
       
   }
 
   mapping(uint256 => Patient) allPatients;
   uint256 totalPatients = 0;
   //"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "iwatch 2", "2000"
   function addPatient(address _creator, string memory _patientName,string memory _date,string memory _gender,string memory _yearofbirth,string memory _patientaddress,string memory _mobilenumber) public returns(uint256){
       string[] memory _treatments;
       string[] memory _dates;
       string[] memory _filecid;
       Patient memory newPatient = Patient({creator: _creator,patientName: _patientName,patientId: totalPatients, date : _date, gender:_gender,yearofbirth:_yearofbirth,patientaddress:_patientaddress,mobilenumber:_mobilenumber,treatments : _treatments, dates:_dates, filecid:_filecid});
       allPatients[totalPatients] = newPatient;
       totalPatients++;
       return totalPatients;
   }
 
   function getPatient(uint256 _patientId) public view returns(Patient memory p){
       return allPatients[_patientId];
   }
   function getPid() public view returns(uint256){
       return totalPatients-1;
   }
   function addTreatment(uint256 _patientId,string memory _treatment,string memory _filecid, string memory _date) public returns(bool){
        allPatients[_patientId].treatments.push(_treatment);
        allPatients[_patientId].filecid.push(_filecid);
        allPatients[_patientId].dates.push(_date);
       return true;
   }
}