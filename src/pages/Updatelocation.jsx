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
    "0xF5Abdc1d50117aB2e4908154EC78b1473B12c49F",
    abi,
    signer
  );
  console.log(data.get("pid"));
  console.log(data.get("loc"));
  console.log(data.get("date"));
  var t = await Product.addTreatment(
    parseInt(data.get("pid")),
    data.get("loc"),
    data.get("date")
  );
  console.log(t);
};

function Updatelocation() {
  const [PatientInfo, setPatientInfo] = useState({
    creator: "",
    patientName: "",
    patientId: "",
    date: "",
    gender: "",
    yearofbirth: "",
    patientaddress: "",
    mobilenumber: "",
    treatments: [],
    dates: [],
    fileCid: "",
  });

  const handlePollData = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const Patient = new ethers.Contract(
      "0xF5Abdc1d50117aB2e4908154EC78b1473B12c49F",
      abi,
      provider
    );

    console.log(parseInt(data.get("pid")));
    const response = await Patient.getPatient(parseInt(data.get("pid")));
    console.log(response);
    const creator = response.creator;
    const patientName = response.patientName;
    const patientId = response.patientId.toNumber();
    const date = response.date;
    const gender = response.gender;
    const yearofbirth = response.yearofbirth;
    const patientaddress = response.patientaddress;
    const mobilenumber = response.mobilenumber;
    const treatments = response.treatments;
    const dates = response.dates;
    setPatientInfo({
      creator: creator,
      patientName: patientName,
      patientId: patientId,
      date: date,
      gender: gender,
      yearofbirth: yearofbirth,
      patientaddress: patientaddress,
      mobilenumber: mobilenumber,
      treatments: treatments,
      dates: dates,
    });
  };

  return (
    <div className="h-full bg-gray-900">
      <Navbar />
      <div className="flex items-center justify-center pt-20 my-3">
        <div className="flex flex-col">
          <Searchbox handlePollData={handlePollData} />
          {/* <div className="my-5">
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
          </div> */}
        </div>
      </div>
      <div>
        <div className="w-screen flex items-center justify-center ">
          <div className="bg-white rounded m-7 flex flex-col justify-center items-center px-10 py-4">
            <h2 className="text-gray-700 font-semibold text-lg mb-7 mt-3">
              Please update treatment details
            </h2>

            <form className="flex flex-col" onSubmit={handleAddLocation}>
              <label className="text-sm pb-2 font-semibold" htmlFor="">
                Patient Name
              </label>
              <input
                type="text"
                name="pname"
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mb-3 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={PatientInfo.patientName}
                disabled={true}
              />

              <label className="text-sm pb-2 font-semibold" htmlFor="">
                Patient ID
              </label>
              <input
                type="text"
                name="pid"
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-gray-200 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mb-3 focus:outline-none hover:cursor-default "
                aria-label="Search"
                aria-describedby="button-addon2"
                // disabled={true}
                value={PatientInfo.patientId}
              />
              <label className="text-sm pb-2 font-semibold" htmlFor="">
                Treatment
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
                Update Treatment
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
