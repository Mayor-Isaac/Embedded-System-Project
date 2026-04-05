import React from 'react'
import { getCurrentDate } from '../utils/getCurrentDate'

export default function Header() {
  return (
      <div>
          <div className="flex flex-col gap-1">
              <h1>Welcome, <span>User</span></h1>
              <span>{getCurrentDate() }</span>
          </div>
    </div>
  )
}
