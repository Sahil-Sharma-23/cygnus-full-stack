import React from 'react'
import { Separator } from '@/components/ui/separator'
import SignupForm from '@/components/signup-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="w-full grid place-items-center min-h-screen">
      <div className="flex items-center justify-center py-12 col-span-5">
        <div className="mx-auto grid max-w-2xl w-full gap-6 px-4">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-bold text-left">
              🌟 Get Started!
            </h1>
            <p className="text-balance text-muted-foreground text-left">
              Create Your Account and Dive In🌟
            </p>
          </div>
          <Separator />

          <SignupForm />

          <div className="text-center text-sm space-y-2">
            Already have an account?&nbsp;
            <Link
              href="/auth/login"
              className="hover:text-muted-foreground hover:underline duration-300 transition-all"
            >
              Login here!
            </Link>
            <p>
              By Signing up, you agree to our&nbsp;
              <Link
                href={"#"}
                className="underline duration-300 transition-all hover:text-muted-foreground"
              >
                Terms of Use
              </Link>
              &nbsp;and&nbsp;
              <Link
                href={"#"}
                className="underline duration-300 transition-all hover:text-muted-foreground"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
