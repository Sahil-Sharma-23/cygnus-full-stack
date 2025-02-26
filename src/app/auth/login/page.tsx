import React from 'react'
import LoginForm from '@/components/login-form'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
      <div className="w-full grid place-items-center min-h-screen">
      <div className="flex items-center justify-center py-12 col-span-5">
        <div className="mx-auto grid max-w-2xl w-full gap-6 px-4">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-bold text-left">
              🌟 Welcome Back!
            </h1>
            <p className="text-balance text-muted-foreground text-left">
              Enter Your Credentials to Proceed...
            </p>
          </div>
          <Separator />

          <LoginForm />

          <div className="text-center text-sm space-y-2">
            Already have an account?&nbsp;
            <Link
              href="/auth/register"
              className="hover:text-muted-foreground hover:underline duration-300 transition-all"
            >
              Register here!
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
