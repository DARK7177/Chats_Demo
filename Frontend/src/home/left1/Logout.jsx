import React from "react";
import { BiLogOut } from "react-icons/bi";

export default function Logout() {
  return (
    <div className="w-[4%]  bg-slate-950 text-white flex flex-col justify-end">
      <div className="py-3 align-bottom">
        <form action="">
          <div className="flex space-x-3">
            <button>
              <BiLogOut className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
