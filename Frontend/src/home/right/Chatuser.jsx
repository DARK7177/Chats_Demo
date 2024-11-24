import React from "react";

function Chatuser() {
  return (
    <>
      <div className="pl-5 pt-5  h-[12vh]  flex space-x-4 bg-gray-500 hover:bg-gray-600 duration-300">
        <div>
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl">Shaswat Choudhary</h1>
          <span className="text-sm">Online</span>
        </div>
      </div>
    </>
  );
}

export default Chatuser;
