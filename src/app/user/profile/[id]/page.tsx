import React from 'react'
import UserProfileForm from '@/components/user-profile-form'

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const userId = (await params).id

  return (
    <div className='w-[700px]'>
      <h1 className='text-2xl mb-4 text-center font-bold'>Update Profile</h1>
      <UserProfileForm userId={userId} />
    </div>
  )
}
