import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function Navbar() {
  return (
    <div className='w-full px-10 py-3 flex justify-between'>
      <Link href="/">
        <Image src="/logo.jpeg" alt="logo" width={150} height={50} />
      </Link>
      <nav>
        <ul className='flex gap-4'>
          <li>
            <Link href="/">
              <Button variant={"ghost"}>Home</Button>
            </Link>
          </li>
          <li>
            <Link href="/book-hotel">
              <Button variant={"ghost"}>Hotels</Button>
            </Link>
          </li>
          <li><Link href="/auth/login">
            <Button variant={"ghost"}>Login</Button>
          </Link></li>
          <li><Link href="/auth/register">
            <Button variant={"ghost"}>Register</Button>
          </Link></li>
        </ul>
      </nav>
      <span className='w-36'></span>
    </div>
  )
}
