import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import Searchbox from '../components/Searchbox';
import abi from "../pages/abi.json";
import { ethers } from "ethers";



function Checkproduct() {
  const [result,getresult] = useState(true);

  const [PatientInfo, setPatientInfo] = useState({
    creator: "",
    patientName: "",
    patientId: "",
    date: "",
    gender:"",
    yearofbirth:"",
    patientaddress:"",
    mobilenumber:"",
    treatments: [],
    dates:[]
  

  });

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const handlePollData = async (e) => {
   
    e.preventDefault();
    const data = new FormData(e.target);
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const Patient= new ethers.Contract(
      "0x9b91111a2fd76a023e48479bc532540b32a5c00c",
      abi,
      provider
    );
    const response = await Patient.getItem(parseInt(data.get("pid")));
    console.log(response);
    const creator = response.creator;
    const patientName = response.patientName;
    const patientId = response.patientId.toNumber();
    const date = response.date;
    const gender= response.gender;
    const yearofbirth= response.yearofbirth;
    const patientaddress= response.patientaddress;
    const mobilenumber= response.mobilenumber;
    const treatments= response.treatments;
    const dates= response.dates;
    setPatientInfo({
      creator: creator,
      patientName: patientName,
      patientId: patientId,
      date: date,
      gender:gender,
      yearofbirth:yearofbirth,
      patientaddress:patientaddress,
      mobilenumber:mobilenumber,
      treatments:treatments,
      dates:dates
    });
  };

  return (
    <div className=' h- bg-sky-200'>
      <Navbar />
      <div className="h-screen flex items-center justify-center ">
        <div className='flex flex-col'>
          <Searchbox handlePollData={handlePollData}/>
          <div className='flex items-center justify-center'>
            <img src="/logos/qr-code.png" alt="" />
            <p className='text-white ml-2'>Scan QR</p>
          </div>
          {result ? 
          <div className='bg-white rounded m-7 flex flex-col justify-center px-7 py-4'>
            <p>Patient Name : {PatientInfo.productName}</p>
            <p>Registerd By : {PatientInfo.creator} </p>
            <p>Manufacture Date: {PatientInfo.date}</p>

          </div>
          : <></>}
        </div>
      </div>
    </div>
  )
}

export default Checkproduct;