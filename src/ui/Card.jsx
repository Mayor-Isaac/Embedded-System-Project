import React, { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";

import { MdWifi, MdWifi1Bar } from "react-icons/md";
import { IoBulbOutline } from "react-icons/io5";
import { IoBulbSharp } from "react-icons/io5";
import { PiFanLight } from "react-icons/pi";
import { PiFanFill } from "react-icons/pi";
import { PiPlugsLight } from "react-icons/pi";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { IoTvOutline } from "react-icons/io5";
import { IoTvSharp } from "react-icons/io5";
import { db } from "../../firebaseConfig";

const iconMap = {
  IoBulbOutline,
  IoBulbSharp,
  PiFanLight,
  PiFanFill,
  PiPlugsLight,
  PiPlugsConnectedFill,
  IoTvOutline,
  IoTvSharp,
};


export default function Card({ label, dbPath, data }) {
  const ActiveIcon = iconMap[data.activeIcon];
  const InactiveIcon = iconMap[data.inactiveIcon];
  
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const statusRef = ref(db, dbPath);

    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      setIsOn(data === 1); // If database is 1, set state to true
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dbPath]);

  const handleToggle = () => {

    const newValue = isOn ? 0 : 1;
    set(ref(db, dbPath), newValue);

  };


  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div
        className={`absolute inset-0 bg-linear-to-tr from-teal-500 via-green-500 to-teal-100 transition-opacity duration-500 ease-in-out ${
          isOn ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative z-10 py-9 px-7 flex flex-col gap-8 transition-colors duration-500 ease-in-out ${
          isOn ? "text-inherit" : "text-gray-200 bg-gray-700/50"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="relative w-6 h-6 text-2xl">
            {ActiveIcon && (
              <ActiveIcon
                size={24}
                className={` ${data.name === "Bulb" ? "text-yellow-200" : data.name === "Fan" ? "animate-spin" : ""} absolute inset-0 transition-all duration-300 ${
                  isOn ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              />
            )}
            {InactiveIcon && (
              <InactiveIcon
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  !isOn ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              />
            )}
          </div>

          <div className="relative w-6 h-6 text-2xl">
            <MdWifi
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isOn ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            />
            <MdWifi1Bar
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                !isOn ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            />
          </div>
        </div>

        <p className="font-bold text-[20px]">{label}</p>

        <div className="flex items-center justify-between w-full">
          <h3 className="uppercase font-light text-[16px] ">{isOn ? "ON" : "OFF"}</h3>
          <div
            onClick={handleToggle}
            className={`w-14 h-8 p-0.5 cursor-pointer transition relative ease-in-out duration-200 rounded-full ${
              isOn ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <button
              className={`w-6 h-6 absolute cursor-pointer translate-y-1/2 bottom-1/2 rounded-full transition-all duration-200 ${
                isOn ? "bg-blue-200 right-0.5" : "bg-white left-1"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
