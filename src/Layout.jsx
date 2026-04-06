import React from 'react'
import Header from './components/Header'
import Card from './ui/Card'
import Hero from './ui/Hero';

export default function Layout() {
  const deviceArr = [
    {
      id: 1,
      name: "Bulb",
      status: "On",
      activeIcon: "IoBulbSharp",
      inactiveIcon: "IoBulbOutline",
      dbPath: "controls/bulb"
    },
    {
      id: 2,
      name: "Fan",
      status: "Off",
      activeIcon: "PiFanFill",
      inactiveIcon: "PiFanLight",
      dbPath: "controls/fan"
    },
    {
      id: 3,
      name: "Socket",
      status: "Off",
      activeIcon: "PiPlugsConnectedFill",
      inactiveIcon: "PiPlugsLight",
      dbPath: "controls/socket"
    },
    {
      id: 4,
      name: "TV",
      status: "Off",
      activeIcon: "IoTvSharp",
      inactiveIcon: "IoTvOutline",
      dbPath: "controls/tv"
    },
  ];


  return (
    <main className="p-5 flex flex-col gap-10">
      <Header />

      <Hero />

      <section className="grid grid-cols-2 gap-6">
        {deviceArr.map((item) => (
          <Card
            key={item.name}
            data={item}
            label={item.name}
            dbPath={item.dbPath}
          />
        ))}
      </section>
    </main>
  );
}
