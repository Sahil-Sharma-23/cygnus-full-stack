import React from 'react'

type UserProfileFormProps = {
  userId: string;
}

export default function UserProfileForm({userId}:UserProfileFormProps) {
  return (
    <div>UserProfileForm: {userId}</div>
  )
}
