import React from 'react'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar'

export default function Dashboard() {
  return (
    <div className='w-[100%]'>
        <Header />
        <div className="grid grid-cols-[20%_80%]">
            <Sidebar />
            <div className=''>123</div>
        </div>
    </div>
  )
}
