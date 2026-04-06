import React from 'react'
import { useEffect, useState } from "react";
import { db } from '../../firebaseConfig';
import { ref, onValue } from "firebase/database";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";

export default function Hero() {
    const [location, setLocation] = useState({
      city: "Getting location...",
      area: null,
    });

    useEffect(() => {
      if (!navigator.geolocation) {
        setLocation((prev) => ({ ...prev, city: "Geolocation not supported" }));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          // Optional: resolve city name from coordinates
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&lat=${lat}&lon=${lon}`,
            );
            const data = await res.json();
              const addr = data?.address || {};
              
              console.log('Geocoding response:', data);

            const city =
              addr.city ||
              addr.town ||
              addr.village ||
              addr.state ||
              "Unknown location";

            const area =
              addr.suburb ||
              addr.neighbourhood ||
              addr.quarter ||
              addr.city_district ||
              addr.residential ||
              addr.amenity ||
              addr.hamlet ||
              "";

            setLocation({
              city,
              lat,
              lon,
              area,
            });
          } catch {
            setLocation({
              city: "Location found",
               area,
            });
          }
        },
        () => {
          setLocation((prev) => ({
            ...prev,
            city: "Location permission denied",
          }));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    }, []);

    const [temp, setTemp] = useState(null);
    const [humidity, setHumidity] = useState(null);


    const [tempFade, setTempFade] = useState(false);
    const [humidityFade, setHumidityFade] = useState(false);

    useEffect(() => {
      // 1. Point to data path
        const tempRef = ref(db, "environment/temp");
        const humidityRef = ref(db, "environment/humidity");

      // Listener for temperature
      const unsubscribeTemp = onValue(tempRef, (snapshot) => {
        const data = snapshot.val();
        setTemp(data);
      });
        // Listener for humidity
      const unsubscribeHumidity = onValue(humidityRef, (snapshot) => {
        const data = snapshot.val();
        setHumidity(data);
      });

        return () => {
            unsubscribeTemp();
            unsubscribeHumidity();
        }
    }, []);


    useEffect(() => {
      if (temp === null) return;
      setTempFade(true);
      const t = setTimeout(() => setTempFade(false), 300);
      return () => clearTimeout(t);
    }, [temp]);

    useEffect(() => {
      if (humidity === null) return;
      setHumidityFade(true);
      const t = setTimeout(() => setHumidityFade(false), 300);
      return () => clearTimeout(t);
    }, [humidity]);

  return (
    <div className="py-5 px-10 rounded-3xl bg-linear-to-tr from-teal-500 via-green-500 to-teal-100">
      <div className="flex items-center justify-between ">
        <div className="flex gap-4 ">
          <TiWeatherPartlySunny size={48} className="" />
          <h3 className="font-bold text-[40px]">{"Cloudy"}</h3>
        </div>
        <h1
          className={`font-bold text-[48px] transition-opacity duration-500 ease-in-out ${
            tempFade ? "opacity-0" : "opacity-100"
          }`}
        >
          {temp || "--"}&deg;
        </h1>
      </div>

      <div className="flex gap-5">
            <IoLocationOutline size={25} className="inline-block font-bold" />
        <div className="flex flex-col gap-0.5">
          <p className="font-medium text-[22px]">
            {location.area && `${location.area}, `}
          </p>
          <p className="">{location.city}.</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <div className="flex flex-col justify-center items-center">
          <h3
            className={`font-bold text-[24px] transition-opacity duration-500 ease-in-out ${
              humidityFade ? "opacity-0" : "opacity-100"
            }`}
          >
            {humidity || "--"} %
          </h3>
          <p className="text-18px">Humidity</p>
        </div>
      </div>
    </div>
  );
}
