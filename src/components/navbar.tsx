"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useUserLoginStatus } from '@/app/context/UserLoginStatusContext';

export default function Navbar() {
  const router = useRouter();
  const { isUserLoggedIn, setIsUserLoggedIn } = useUserLoginStatus();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  }, [setIsUserLoggedIn])

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
            <Link href={`/user/profile`}>
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
