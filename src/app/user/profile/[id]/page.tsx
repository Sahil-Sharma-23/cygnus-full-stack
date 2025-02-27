import UserProfileForm from '@/components/user-profile-form'
import React from 'react'

export default async  function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const userId = (await params).id

  return (
    <>
      <div>
        <h1 className='text-2xl'>Profile Page | User ID: {userId}</h1>

        <UserProfileForm userId={userId} />
      </div>
    </>
  )
}
