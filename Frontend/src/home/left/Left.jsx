import React from "react";
import Search from "./Search";
import Users from "./Users";

function left() {
  return (
    <div className="w-[30%]  bg-black text-gray-300">
      <h1 className="font-bold text-4xl p-2 px-11">Chat</h1>
      <Search></Search>
      <hr></hr>
      <Users></Users>
    </div>
  );
}

export default left;
