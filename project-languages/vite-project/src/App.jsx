import "./index.css";
import React, { useEffect, useState } from "react";
import Field from "./components/field";
import Translate from "./components/translate";
import Languages from "./components/languages";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000");
const userName = nanoid(4);
export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // useEffect(() => {
  //   socket.on("chat", (payload) => {
  //     setChat([...chat, payload]);
  //   });
  // });

  useEffect(() => {
    socket.on("load old msgs", (messages) => {
      setChat(messages); // Update chat state with historical messages
    });

    socket.on("chat", (payload) => {
      setChat((prevChat) => [...prevChat, payload]); // Append new messages to the existing chat history
    });
  }, []);

  const sendChat = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("chat", { message, userName });
    setMessage("");
  };
  return (
    <div className="h-screen w-screen">
      <div className="h-full ">
        <div className="h-[80%] p-6 ">
          <div className="flex flex-col mt-2  h-full p-4 rounded-md bg-white border-black border-[1px]">
            {chat.map((payload, index) => {
              // Determine alignment based on whether the message is from the current user
              const isCurrentUser = payload.userName === userName;
              return (
                <div
                  key={index}
                  className={`rounded-md px-4 py-2 mt-2 flex ${
                    isCurrentUser
                      ? "bg-blue-100 justify-end"
                      : "bg-green-200 justify-start"
                  } text-sm`}
                >
                  {!isCurrentUser && (
                    <span className="font-semibold ">{payload.userName}:</span>
                  )}
                  <p>{payload.message}</p>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={sendChat}>
          <div className="flex justify-center items-center gap-2  p-6">
            <input
              placeholder="Type.."
              className="border-black border-[1px] p-2 w-full"
              id="inputlabel"
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button type="submit" className="bg-blue-400 p-2 rounded-md">
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
