import React from 'react'
import { getCurrentDate } from '../utils/getCurrentDate'
import { IoGrid } from 'react-icons/io5';

export default function Header() {
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex flex-col gap-1">
        <h1 className='font-medium text-[30px] '>
          Welcome, <span>User</span>
        </h1>
        <span>{getCurrentDate()}</span>
      </div>

      {/* <IoGrid size={25} className='' /> */}
    </div>
  );
}
