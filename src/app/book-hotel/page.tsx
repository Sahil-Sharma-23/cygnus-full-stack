import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Hotel } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function BookHotelPage() {
  const response = await fetch(`${process.env.API_BASE_URL}/hotel`, {
    method: "GET",
  })
  const hotels: Hotel[] = await response.json();

  return (
    <>
      <h1 className='text-2xl font-bold text-center'>Book Hotel Page</h1>
      <div className='w-full my-6 grid grid-cols-3 gap-6 place-items-center'>
        {hotels.map((hotel: Hotel) => (
          <Link key={hotel.id} href={`/book-hotel/${hotel.id}`}>
            <Card className="w-96 text-center transition-all duration-300 ease-in-out shadow-none group hover:cursor-pointer menu-section-card-hover">
              <CardHeader>
                <CardTitle>{hotel.hotel_name}</CardTitle>
                <CardDescription>{hotel.hotel_name} Welcomes you.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid place-items-center'>
                  <Image src={hotel.hotel_image_url} alt={hotel.hotel_name} width={300} height={300} />
                  <div className='space-y-2'>
                    <p>Localtion: {hotel.city}, {hotel.country}</p>
                    <p>
                      Bookings:&nbsp;
                      <span className={`${hotel.availability_status ? "bg-green-500" : "bg-red-500"} p-1 px-2 text-white rounded-lg`}>
                        {hotel.availability_status ? "Available" : "Not Available"}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex justify-center'>
                <Button>Book Now</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
