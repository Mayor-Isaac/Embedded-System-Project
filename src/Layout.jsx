import React from 'react'
import Header from './components/Header'
import Card from './ui/Card'
import Hero from './ui/Hero';

export default function Layout() {
  const deviceArr = [
    {
      id: 1,
      name: "Bulb",
      activeIcon: "IoBulbSharp",
      inactiveIcon: "IoBulbOutline",
      dbPath: "controls/bulb",
    },
    {
      id: 2,
      name: "Fan",
      activeIcon: "PiFanFill",
      inactiveIcon: "PiFanLight",
      dbPath: "controls/fan",
    },
    {
      id: 3,
      name: "Socket",
      activeIcon: "PiPlugsConnectedFill",
      inactiveIcon: "PiPlugsLight",
      dbPath: "controls/tv",
    },
    // {
    //   id: 4,
    //   name: "TV",
    //   activeIcon: "IoTvSharp",
    //   inactiveIcon: "IoTvOutline",
    //   dbPath: "controls/socket",
    // },
  ];


  return (
    <main className="py-5 px-10 flex max-h-screen flex-col gap-10">
      <Header />

      <Hero />

      <section className="grid grid-cols-1 flex-1 gap-6">
        {deviceArr.map((item) => (
          <Card
            key={item.name}
            data={item}
            label={item.name}
            dbPath={item.dbPath}
          />
        ))}
      </section>

      {/* Copyright */}
      <p className="text-center text-[14px]">
        &copy; {new Date().getFullYear()} EEE Group 10 Smart Home Dashboard. All rights reserved.
      </p>
    </main>
  );
}
