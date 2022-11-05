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
import { data } from "autoprefixer";

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

  const [ProductInfo, setProductInfo] = useState({
    creator: "",
    productName: "",
    productId: "",
    date: "",
    states: [],
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
    const fileCid = response.filecid;
    setProductInfo({
      creator: creator,
      productName: productName,
      productId: productId,
      date: date,
      states: states,
      dates: dates,
      fileCid: fileCid,
    });
    setresult(true);
  };

  return (
    <div className="h-full bg-gray-900 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center pt-20">
        <div className="flex flex-col">
          <Searchbox handlePollData={handlePollData} />
          <div>
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
          {result && ProductInfo.productName != "" ? (
            <div className="bg-white rounded m-7 flex flex-col justify-center px-7 py-4">
              <div className="m-1">
                <div className="text-xs text-gray-700"> Product Name</div>
                <div className="font-semibold text-lg ">
                  {ProductInfo.productName}
                </div>
              </div>
              <div className="m-1">
                <div className="text-xs text-gray-700"> Registered By</div>
                <div className="font-semibold text-lg">
                  {ProductInfo.creator}
                </div>
              </div>
              <div className="m-1">
                <div className="text-xs text-gray-700"> Manufactured Date</div>
                <div className="font-semibold text-lg">{ProductInfo.date}</div>
              </div>
              {ProductInfo.fileCid && (
                <div className="m-1">
                  <div className="text-xs text-gray-700"> Files: </div>
                  <a
                    className="text-lg text-blue-700"
                    href={"https://" + ProductInfo.fileCid + ".ipfs.dweb.link/"}
                  >
                    {"https://" + ProductInfo.fileCid + ".ipfs.dweb.link/"}
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded m-7 flex flex-col justify-center px-7 py-4">
              Oops! Given product id cannot be found!
            </div>
          )}

          <div>
            {ProductInfo.states.length > 0 ? (
              <VerticalTimeline>
                {ProductInfo.states.map((state, index) => (
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
                      {ProductInfo.dates[index]}
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
