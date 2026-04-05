import React from 'react'
import { getCurrentDate } from '../utils/getCurrentDate'
import { IoGrid } from 'react-icons/io5';

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h1>
          Welcome, <span>User</span>
        </h1>
        <span>{getCurrentDate()}</span>
      </div>

      <IoGrid size={25} className='' />
    </div>
  );
}
