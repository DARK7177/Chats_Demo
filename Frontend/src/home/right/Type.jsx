import React from "react";
import { BsSendPlusFill } from "react-icons/bs";

function type() {
  return (
    <>
      <div className="flex space-x-3 h-[10vh] text-center bg-gray-800">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full px-3 py-3 rounded-xl mt-1 grow outline-none bg-slate-900"
          />
        </div>
        <button className="text-3xl">
          <BsSendPlusFill className="mr-2" />
        </button>
      </div>
    </>
  );
}

export default type;
