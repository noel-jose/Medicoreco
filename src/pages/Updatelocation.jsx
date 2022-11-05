import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Searchbox from "../components/Searchbox";
import Modal from "../components/Modal";
import { handleQrUpload } from "../pages/Checkproduct";
import abi from "../pages/abi.json";
import { ethers } from "ethers";

const handleAddLocation = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const Product = new ethers.Contract(
    "0x9d607ea48fb9f9537e3f08ccbf8d4b9acb3638da",
    abi,
    signer
  );
  console.log(data.get("pid"));
  console.log(data.get("loc"));
  console.log(data.get("date"));
  await Product.updateItemLocation(
    parseInt(data.get("pid")),
    data.get("loc"),
    data.get("date")
  );
  // console.log(response);
};

function Updatelocation() {
  const [ProductInfo, setProductInfo] = useState({
    creator: "",
    productName: "",
    productId: "",
    date: "",
    states: [],
    dates: [],
    fileCid: "",
  });

  const handlePollData = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const Product = new ethers.Contract(
      "0x9d607ea48fb9f9537e3f08ccbf8d4b9acb3638da",
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
    const dates = response.dates;
    const fileCid = response.fileCid;
    setProductInfo({
      creator: creator,
      productName: productName,
      productId: productId,
      date: date,
      states: states,
      dates: dates,
      fileCid: fileCid,
    });
  };

  return (
    <div className="h-full bg-gray-900">
      <Navbar />
      <div className="flex items-center justify-center pt-20 my-3">
        <div className="flex flex-col">
          <Searchbox handlePollData={handlePollData} />
          <div className="my-5">
            <label className="flex items-center justify-center">
              <input
                className="hidden"
                type="file"
                id="qr-input-file"
                onChange={handleQrUpload}
              />
              <div id="reader" className="hidden"></div>
              <img src="/logos/qr-code.png" alt="" />
              <p className="text-white ml-2">Scan QR</p>
            </label>
          </div>
        </div>
      </div>
      <div>
        <div className="w-screen flex items-center justify-center ">
          <div className="bg-white rounded m-7 flex flex-col justify-center items-center px-10 py-4">
            <h2 className="text-gray-700 font-semibold text-lg mb-7 mt-3">
              Please update location details
            </h2>

            <form className="flex flex-col" onSubmit={handleAddLocation}>
              <label className="text-sm pb-2 font-semibold" htmlFor="">
                Product Name
              </label>
              <input
                type="text"
                name="pname"
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mb-3 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={ProductInfo.productName}
                disabled={true}
              />

              <label className="text-sm pb-2 font-semibold" htmlFor="">
                Product ID
              </label>
              <input
                type="text"
                name="pid"
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mb-3 focus:outline-none hover:cursor-default "
                aria-label="Search"
                aria-describedby="button-addon2"
                // disabled={true}
                value={ProductInfo.productId}
              />
              <label className="text-sm pb-2 font-semibold" htmlFor="">
                Location
              </label>
              <input
                type="text"
                name="loc"
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mb-4 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <label className="text-sm pb-2 font-semibold" htmlFor="">
                Date
              </label>
              <input
                type="text"
                name="date"
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mb-4 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <button
                type="submit"
                class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                id="button-addon2"
              >
                Update Location
              </button>
            </form>

            {/* Modal Section*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updatelocation;
