import React, { useEffect } from "react";
import Flower from "./svg/flower";
import { home } from "../api";

function Field() {
  const homeroute = async () => {
    try {
      let response = await home();
      console.log(response);
    } catch (error) {}
  };

  return (
    <div className="h-full ">
      <div className="h-96  p-6 ">
        <div className="flex justify-center items-center h-full p-4 rounded-md bg-white border-black border-[1px]">
          hellos
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <input
          placeholder="Type.."
          className="border-black border-[1px] p-2"
          id="inputlabel"
          type="text"
        />
        <button className="bg-blue-400 p-2 rounded-md">send</button>
      </div>
    </div>
  );
}

export default Field;
