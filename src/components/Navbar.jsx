import React from "react";

function Navbar() {
  return (
    <div className="float-top bg-gray-900 p-4">
      <div className="flex items-center text-gray-400 font-semibold text-sm">
        <img
          src="/logos/medbin.png"
          className="w-16 bg-white  mr-5"
          alt="image"
        />
        <a href="/checkproduct" className="mr-4">
          Check Patient
        </a>
        <a href="/addproduct" className="mr-4">
          Add Patient
        </a>
        <a href="/updatelocation" className="mr-4">
          Update Details
        </a>
      </div>
    </div>
  );
}

export default Navbar;
