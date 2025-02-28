"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(false);
  const router = useRouter();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsUserLoggedIn(false);
    router.replace("/auth/login");
  }

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
          <li>
            <Link href="/auth/login">
              <Button variant={"ghost"}>Login</Button>
            </Link>
          </li>
          <li>
            <Link href="/auth/register">
              <Button variant={"ghost"}>Register</Button>
            </Link>
          </li>
          <li>
            <Link href={`/user/profile/${userId}`}>
              <Button variant={"ghost"}>Profile</Button>
            </Link>
          </li>
        </ul>
      </nav>
      <span className='w-36 flex justify-end'>
        {isUserLoggedIn ? (
          <Button variant={"outline"} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant={"outline"} onClick={() => router.replace("/auth/login")}>
            Login
          </Button>
        )}
      </span>
    </div>
  )
}
