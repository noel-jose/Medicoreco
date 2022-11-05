import React from 'react'
import {Html5Qrcode} from "html5-qrcode"

// File based scanning

const handleUpload = (e) => {
  
  const html5QrCode = new Html5Qrcode("reader");
  const imageFile = e.target.files[0];
  console.log(e.target.files)
  // Scan QR Code

  html5QrCode.scanFile(imageFile, true)
  .then(decodedText => {
    // success, use decodedText
    console.log(decodedText);
  })
  .catch(err => {
    // failure, handle it.
    console.log(`Error scanning file. Reason: ${err}`)
  });
};



function Qr() {
    
  return (
    <div id="reader">Qr
        {/* <div id="reader" width="600px" height="600px"></div> */}
        <input type="file" id="qr-input-file" onChange={handleUpload}></input>
    </div>
  )
}

export default Qr