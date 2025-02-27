import React from 'react'

export default async function HotelDetailsPage({
  params,
}: {
  params: Promise<{ hotelId: string }>
}) {
  const hotelId = (await params).hotelId

  return (
    <div>HotelDetailsPage: {hotelId}</div>
  )
}
