import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Searchbox from "../components/Searchbox";
import abi from "../pages/abi.json";
import { ethers } from "ethers";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Html5Qrcode } from "html5-qrcode";

// to handle the qr code uploaded
const handleQrUpload = (e) => {
  const html5QrCode = new Html5Qrcode("reader");
  const imageFile = e.target.files[0];
  console.log(e.target.files);
  // Scan QR Code

  html5QrCode
    .scanFile(imageFile, true)
    .then((decodedText) => {
      // success, use decodedText
      document.getElementsByName("pid")[0].value = decodedText;
      document.getElementById("button-addon2").click();
      console.log(decodedText);
    })
    .catch((err) => {
      // failure, handle it.
      console.log(`Error scanning file. Reason: ${err}`);
    });
};

function Checkproduct() {
  const [result, setresult] = useState(false);

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

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePollData = async (e) => {
    // e.preventDefault();
    // const data = new FormData(e.target);

    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    // const Product = new ethers.Contract(
    //   "0x72a13448f045398754514b094fa5f666b1b9ed4d",
    //   abi,
    //   provider
    // );
    // const response = await Product.getItem(parseInt(data.get("pid")));
    // console.log(response);
    // const creator = response.creator;
    // const productName = response.productName;
    // const productId = response.productId.toNumber();
    // const date = response.date;
    // const states = response.states;
    // setProductInfo({
    //   creator: creator,
    //   productName: productName,
    //   productId: productId,
    //   date: date,
    //   states: states,
    // });
    // setresult(true);
    e.preventDefault();
    const data = new FormData(e.target);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    console.log(parseInt(data.get("pid")));

    const Patient = new ethers.Contract(
      "0xF5Abdc1d50117aB2e4908154EC78b1473B12c49F",
      abi,
      provider
    );
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
    setresult(true);
  };

  return (
    <div className="h-full bg-gray-900 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center pt-20">
        <div className="flex flex-col">
          <Searchbox handlePollData={handlePollData} />
          {/* <div>
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
          {result && PatientInfo.patientName != "" ? (
            <div className="bg-white rounded m-7 flex flex-col justify-center px-7 py-4">
              <div className="m-1">
                <div className="text-xs text-gray-700"> Patient Name</div>
                <div className="font-semibold text-lg ">
                  {PatientInfo.patientName}
                </div>
              </div>
              <div className="m-1">
                <div className="text-xs text-gray-700"> Registered By</div>
                <div className="font-semibold text-lg">
                  {PatientInfo.creator}
                </div>
              </div>
              {/*<div className="m-1">
                <div className="text-xs text-gray-700"> Adhaar ID</div>
                <div className="font-semibold text-lg">{PatientInfo.date}</div>
          </div>*/}
              <div className="m-1">
                <div className="text-xs text-gray-700"> Date</div>
                <div className="font-semibold text-lg">{PatientInfo.date}</div>
              </div>
              <div className="m-1">
                <div className="text-xs text-gray-700"> Year of Birth</div>
                <div className="font-semibold text-lg">
                  {PatientInfo.yearofbirth}
                </div>
              </div>
              <div className="m-1">
                <div className="text-xs text-gray-700"> Gender</div>
                <div className="font-semibold text-lg">
                  {PatientInfo.gender}
                </div>
              </div>
              <div className="m-1">
                <div className="text-xs text-gray-700"> Patient Address</div>
                <div className="font-semibold text-lg">
                  {PatientInfo.patientaddress}
                </div>
              </div>
              <div className="m-1">
                <div className="text-xs text-gray-700"> Mobile Number</div>
                <div className="font-semibold text-lg">
                  {PatientInfo.mobilenumber}
                </div>
              </div>
              {PatientInfo.fileCid && (
                <div className="m-1">
                  <div className="text-xs text-gray-700"> Files: </div>
                  <a
                    className="text-lg text-blue-700"
                    href={"https://" + PatientInfo.fileCid + ".ipfs.dweb.link/"}
                  >
                    {"https://" + PatientInfo.fileCid + ".ipfs.dweb.link/"}
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded m-7 flex flex-col justify-center px-7 py-4">
              Oops! Given patient id cannot be found!
            </div>
          )}

          <div>
            {PatientInfo.treatments.length > 0 ? (
              <VerticalTimeline>
                {PatientInfo.treatments.map((state, index) => (
                  <VerticalTimelineElement
                    key={index}
                    className="vertical-timeline-element--work"
                    // date={ProductInfo.dates[index]}
                    iconStyle={{
                      background: "rgb(29, 161, 242)",
                      color: "#fff",
                    }}
                  >
                    <h3 className="vertical-timeline-element-title text-lg">
                      {state}
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle font-light text-xs ">
                      {PatientInfo.dates[index]}
                    </h4>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkproduct;
export { handleQrUpload };
