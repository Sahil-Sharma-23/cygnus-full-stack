"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { Skeleton } from './ui/skeleton';
import { useRouter } from 'next/navigation';
import { DayPicker } from 'react-day-picker';

type ProfileForm = {
  email: string;
  username: string;
  gender: "male" | "female";
  dateOfBirth: Date | undefined;
  fullName: string;
  password: string;
}

type UserProfileFormProps = {
  userId: string;
}

export default function UserProfileForm(params: UserProfileFormProps) {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<ProfileForm>({
    email: "",
    username: "",
    gender: "male",
    dateOfBirth: undefined,
    fullName: "",
    password: ""
  });
  const [date, setDate] = React.useState<Date>();
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async (userId: number) => {
      try {
        const response = await fetch(`/api/user`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId })
        })

        if (!response.ok) {
          toast.error("User unauthorized.");
          router.replace("/auth/login");
          return;
        }
        const userData = await response.json();

        setFormState({
          email: userData[0].email,
          username: userData[0].username,
          gender: userData[0].gender,
          dateOfBirth: userData[0].date_of_birth,
          fullName: userData[0].full_name,
          password: userData[0].password_hash,
        })
        setDate(userData[0].date_of_birth);
      } catch (error) {
        console.error("error: ", error);
      } finally {
        setIsDataLoading(false);
      }
    }

    fetchUserData(Number(params.userId));
  }, [params, router])

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsFormLoading(true); // Set form state to loading

    const registerPayload = {
      id: Number(params.userId),
      email: formState.email,
      username: formState.username,
      password: formState.password,
      gender: formState.gender,
      date_of_birth: formState.dateOfBirth,
      full_name: formState.fullName,
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerPayload),
    });

    if (!response.ok) {
      setIsFormLoading(false);
      toast.error("Failed to update user data.");
      return;
    }

    toast.success("User data updated successfully.");
    setIsFormLoading(false);
  }

  const handleFromDateSelect = (date: Date | null) => {
    if (date) {
      setFormState((prevState) => ({
        ...prevState,
        dateOfBirth: date,
      }));
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="grid gap-4">
      <div className="flex items-center justify-center">
        <Label className="w-24 pr-3">Name: </Label>
        {isDataLoading ? <Skeleton className='h-8 w-full' /> :
          <Input
            placeholder="Full Name"
            value={formState.fullName}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, fullName: e.target.value })
            }
          />
        }
      </div>

      <div className="flex items-center justify-center">
        <Label className="w-24 pr-3">Email: </Label>
        {isDataLoading ? <Skeleton className='h-8 w-full' /> :
          <Input
            placeholder="Email"
            type="email"
            value={formState.email}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, email: e.target.value })}
          />
        }
      </div>

      <div className="flex items-center justify-center">
        <Label className="w-24 pr-3">Username: </Label>
        {isDataLoading ? <Skeleton className='h-8 w-full' /> :
          <Input
            placeholder="Username"
            value={formState.username}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, username: e.target.value })}
          />
        }
      </div>

      <div className="flex items-center">
        <Label className="w-24 pr-3">Gender: </Label>
        <RadioGroup defaultValue="male">
          <div className="flex items-center space-x-2">
            {isDataLoading ? <Skeleton className='h-6 w-20' /> :
              <>
                <RadioGroupItem value="male" id="r1" />
                <Label htmlFor="r1">Male</Label>
              </>
            }
          </div>
          <div className="flex items-center space-x-2">
            {isDataLoading ? <Skeleton className='h-6 w-20' /> :
              <>
                <RadioGroupItem value="female" id="r2" />
                <Label htmlFor="r2">Female</Label>
              </>
            }
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center justify-center">
        <Label className="w-24 pr-3">DOB: </Label>
        {isDataLoading ? <Skeleton className='h-8 w-full' /> :
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <DayPicker
                mode="single"
                selected={formState?.dateOfBirth}
                onSelect={(day) => handleFromDateSelect(day as Date | null)}
                className="p-2"
              />
            </PopoverContent>
          </Popover>
        }
      </div>

      <div className="flex items-center justify-center">
        <Label className="w-24 pr-3">Password: </Label>
        {isDataLoading ? <Skeleton className='h-8 w-full' /> :
          <Input
            placeholder="Password"
            value={formState.password}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, password: e.target.value })}
            type="password"
          />
        }
      </div>

      <Button type="submit" disabled={isFormLoading}>
        {isFormLoading &&
          <LoaderCircle className="animate-spin h-4 w-4" />
        }
        Update Profile
      </Button>
    </form>
  )
}
