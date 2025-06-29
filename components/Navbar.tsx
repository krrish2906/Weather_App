import Link from 'next/link'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { WiDayCloudy } from 'react-icons/wi'

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-sm border-b border-white/30">
            <div className="flex-1">
                <Link href={'/'} className="btn btn-ghost text-xl">
                    <WiDayCloudy className='size-7 relative top-1' />
                    Weather App
                </Link>
            </div>
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <BsThreeDotsVertical className='size-5' />
                </button>
            </div>
        </div>
    )
}
