import React from 'react'
import { getCurrentDate } from '../utils/getCurrentDate'
import { IoGrid } from 'react-icons/io5';

export default function Header() {
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex flex-col gap-1">
        <h1 className="font-medium text-[30px] ">
          Welcome,{" "}
          <span className="bg-linear-to-r from-yellow-700 via-green-500 to-emerald-400 bg-clip-text text-transparent">
            User
          </span>
        </h1>
        <span>{getCurrentDate()}</span>
      </div>
    </div>
  );
}
