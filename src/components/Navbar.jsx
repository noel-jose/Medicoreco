import React from "react";

function Navbar() {
  return (
    <div className="float-top bg-gray-900 p-4">
      <div className="flex items-center text-gray-400 font-semibold text-sm">
        <img src="/logos/verifID.png" className="w-12 h-12 mr-5" alt="image" />
        <a href="/checkproduct" className="mr-4">
          Check Product
        </a>
        <a href="/addproduct" className="mr-4">
          Add Product
        </a>
        <a href="/updatelocation" className="mr-4">
          Update Location
        </a>
      </div>
    </div>
  );
}

export default Navbar;
