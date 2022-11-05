import React from "react";

function Home() {
  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="font-seri text-white flex flex-col items-center justify-center">
        <a
          href="/"
          className="text-4xl p-2 tracking-tighter hover:scale-110 ease-in duration-300"
        >
          HOME
        </a>
        <a
          href="/addproduct"
          className="text-4xl p-2 tracking-tighter hover:scale-110 ease-in duration-300"
        >
          ADD PRODUCT
        </a>
        <a
          href="/checkproduct"
          className="text-4xl p-2 tracking-tighter hover:scale-110 ease-in duration-300"
        >
          CHECK PRODUCT
        </a>
        <a
          href="/updatelocation"
          className="text-4xl p-2 tracking-tighter hover:scale-110 ease-in duration-300"
        >
          UPDATE LOCATION
        </a>
      </div>
      <div className="mt-8 bg-yellow-200 opacity-80 rounded-md p-3">
        This project requires you to have a metamask or similar wallet connected
        to Polygon TestNetwork to function as intented.
      </div>
    </div>
  );
}

export default Home;
