"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type LoginFormState = {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: ""
  });

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsFormLoading(true);

    const loginPayload = {
      email: formState.email,
      password_hash: formState.password,
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });
    if (!response.ok) {
      setIsFormLoading(false);
      toast.error("Invalid credentials");
      return;
    }
    const resJson = await response.json();
    localStorage.setItem("userId", resJson.data.id);
    localStorage.setItem("token", resJson.token);
    router.push("/book-hotel");
    setIsFormLoading(false);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className="grid gap-4">
        <div className="flex items-center justify-center">
          <Label className="w-24 pr-3">Email ID: </Label>
          <Input
            placeholder="Email"
            type="email"
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, email: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-center">
          <Label className="w-24 pr-3">Password: </Label>
          <Input
            placeholder="Password"
            type="password"
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, password: e.target.value })}
          />
        </div>

        <Button type="submit" disabled={isFormLoading}>
          {isFormLoading &&
            <LoaderCircle className="animate-spin h-4 w-4" />
          }
          Submit
        </Button>
      </form>
    </>
  )
}
