import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import Searchbox from '../components/Searchbox';
import abi from "../pages/abi.json";
import { ethers } from "ethers";



function Checkproduct() {
  const [result,getresult] = useState(true);

  const [ProductInfo, setProductInfo] = useState({
    creator: "",
    productName: "",
    productId: "",
    date: "",
    states: []
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

    const Product = new ethers.Contract(
      "0x9b91111a2fd76a023e48479bc532540b32a5c00c",
      abi,
      provider
    );
    const response = await Product.getItem(parseInt(data.get("pid")));
    console.log(response);
    const creator = response.creator;
    const productName = response.productName;
    const productId = response.productId.toNumber();
    const date = response.date;
    const states = response.states;
    setProductInfo({
      creator: creator,
      productName: productName,
      productId: productId,
      date: date,
      states: states
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
            <p>Product Name : {ProductInfo.productName}</p>
            <p>Registerd By : {ProductInfo.creator} </p>
            <p>Manufacture Date: {ProductInfo.date}</p>

          </div>
          : <></>}
        </div>
      </div>
    </div>
  )
}

export default Checkproduct;