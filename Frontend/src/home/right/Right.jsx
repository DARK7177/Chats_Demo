import React from "react";
import Chatuser from "./Chatuser";
import Message from "./Message";
import Type from "./type";

export default function Right() {
  return (
    <div className="w-[70%]  bg-slate-950 text-white">
      <Chatuser></Chatuser>
      <div
        className="py-2 flex-shaswat overflow-y-auto"
        style={{ maxHeight: "calc(88vh - 10vh)" }}
      >
        <Message></Message>
      </div>
      <Type></Type>
    </div>
  );
}
