import React from 'react'
import Header from './components/Header'
import Card from './ui/Card'

export default function Layout() {
  const [devices, setDevices] = React.useState([
    {
      id: 1,
      name: "Bulb",
      status: "On",
      activeIcon: "IoBulbSharp",
      inactiveIcon: "IoBulbOutline",
    },
    {
      id: 2,
      name: "Fan",
      status: "Off",
      activeIcon: "PiFanFill",
      inactiveIcon: "PiFanLight",
    },
    {
      id: 3,
      name: "Socket",
      status: "Off",
      activeIcon: "PiPlugsConnectedFill",
      inactiveIcon: "PiPlugsLight",
    },
    {
      id: 4,
      name: "TV",
      status: "Off",
      activeIcon: "IoTvSharp",
      inactiveIcon: "IoTvOutline",
    },
  ]);

  const handleToggle = (id) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id
          ? { ...device, status: device.status === 'On' ? 'Off' : 'On' }
          : device
      )
    )
  }

  return (
    <main className='p-5 flex flex-col gap-10'>
      <Header />

      <section className='grid grid-cols-2 gap-6' >
        {devices.map((item) => (
          <Card key={item.id} data={item} onToggle={() => handleToggle(item.id)} />
        ))}
      </section>
    </main>
  )
}
