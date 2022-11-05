import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import abi from "../pages/abi.json";
import { ethers } from "ethers";
import QRCode from "qrcode";
import { Web3Storage } from "web3.storage";

const generateQR = async (text) => {
  var canvas = document.getElementById("canvas");
  QRCode.toCanvas(canvas, text, function (error) {
    if (error) console.error(error);
  });
};

var rootCid = "";

function Addproduct() {
  const [isOpen, setisOpen] = useState(false);
  const [fileupload, setFileUpload] = useState(false);
  const [pid, setPid] = useState(-1);

  const handleUpload = async (e) => {
    // e.preventDefault();
    // const data = new FormData(e.target);
    console.log(e.target.files);
    setFileUpload(true);
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE2NGM1N0EwQTk3MkU1MzBkOUY2ODdBNTExRmFFZTQwNjcwYTQwODMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTY3MjY5OTE3NTMsIm5hbWUiOiJkQm95cyJ9.4SYrCu6KlA708OKvo4TP9d_5uCDctLi_LvTveUpgSzY",
    });

    rootCid = await client.put(e.target.files, {
      wrapWithDirectory: false,
    }); // Promise<CIDString>

    // Get info on the Filecoin deals that the CID is stored in
    const info = await client.status(rootCid); // Promise<Status | undefined>
    console.info(rootCid);
    setFileUpload(false);

    // Fetch and verify files from web3.storage
    //https://bafkreihk5gfpij2vv6m4x5d5wgq64wrraqjccssdvwe2suprpv2fyrpxf4.ipfs.dweb.link/
    const res = await client.get(rootCid); // Promise<Web3Response | null>
    const files = await res.files(); // Promise<Web3File[]>
    for (const file of files) {
      console.log(`${file.cid} ${file.name} ${file.size}`);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const signerAddr = await signer.getAddress();
    const Product2 = new ethers.Contract(
      "0x9d607ea48fb9f9537e3f08ccbf8d4b9acb3638da",
      abi,
      signer
    );
    const res = await Product2.getPid();
    console.log("---------------------------------");
    console.log(res.toNumber());
    const pid = res.toNumber() + 1;
    // const qrc = pid + 1;
    
    console.log(pid);
    const Product = new ethers.Contract(
      "0x9d607ea48fb9f9537e3f08ccbf8d4b9acb3638da",
      abi,
      signer
    );
    console.log(signer.getAddress);
    console.log(data.get("pname"));
    // console.log(data.get("pid"));
    console.log(data.get("date"));
    console.log("---------");
    console.log(rootCid);
    await Product.addItem(
      signerAddr.toString(),
      data.get("pname"),
      data.get("date"),
      rootCid
    );
    // setisOpen(true);
    console.log(pid.toString());
    generateQR(pid.toString());
    setPid(pid);
  };

  return (
    <div className="h-full bg-gray-900">
      <Navbar />
      <div className="h-screen w-screen flex items-center justify-center ">
        <div className="bg-white rounded m-7 flex flex-col justify-center items-center px-10 py-4">
          <h2 className="text-gray-700 font-semibold text-lg my-3">
            Please fill product details
          </h2>

          <form className="flex flex-col" onSubmit={handleAddProduct}>
            <label htmlFor="">Product Name</label>
            <input
              type="text"
              name="pname"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mb-3 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Search"
              aria-describedby="button-addon2"
            />

            {/* <label htmlFor="">Product ID</label>
            <input
              type="text"
              name="pid"
              class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mb-3 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Search"
              aria-describedby="button-addon2"
            /> */}
            <label htmlFor="">Date</label>
            <input
              type="text"
              name="date"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mb-4 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <input
              type="file"
              onChange={handleUpload}
              className="w-full px-3  mb-3"
            />
            {fileupload && (
              <div className="my-3 bg-yellow-200 opacity-80 rounded-md p-3">
                Uploading...
              </div>
            )}
            <button
              type="submit"
              className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              id="button-addon2"
              disabled={fileupload}
              onClick={() => setisOpen(true)}
            >
              Add Product
            </button>
          </form>

          {/* Modal Section*/}
        </div>
      </div>
      {isOpen && <Modal setIsOpen={setisOpen} pid={pid}/>}
    </div>
  );
}

export default Addproduct;
