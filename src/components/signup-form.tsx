"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterFormState = {
  email: string;
  username: string;
  gender: "male" | "female";
  dateOfBirth: Date | undefined;
  fullName: string;
  password: string;
}

export default function SignupForm() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<RegisterFormState>({
    email: "",
    username: "",
    gender: "male",
    dateOfBirth: undefined,
    fullName: "",
    password: ""
  });
  const [date, setDate] = React.useState<Date>();
  const router = useRouter();

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsFormLoading(true); // Set form state to loading

    const registerPayload = {
      email: formState.email,
      username: formState.username,
      password_hash: formState.password,
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
      toast.error("Failed to create user.");
      return;
    }

    toast.success("User created. Login to continue.");
    setIsFormLoading(false);
    router.replace("/auth/login");
  }

  useEffect(() => {
    setFormState({
      ...formState,
      dateOfBirth: date
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  return (
    <>
      <form onSubmit={handleFormSubmit} className="grid gap-4">
        <div className="flex items-center justify-center">
          <Label className="w-24 pr-3">Name: </Label>
          <Input
            placeholder="Full Name"
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, fullName: e.target.value })
            }
          />
        </div>

        <div className="flex items-center justify-center">
          <Label className="w-24 pr-3">Email: </Label>
          <Input
            placeholder="Email"
            type="email"
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, email: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-center">
          <Label className="w-24 pr-3">Username: </Label>
          <Input
            placeholder="Username"
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, username: e.target.value })}
          />
        </div>

        <div className="flex items-center">
          <Label className="w-24 pr-3">Gender: </Label>
          <RadioGroup defaultValue="male">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="r1" />
              <Label htmlFor="r1">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="r2" />
              <Label htmlFor="r2">Female</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center justify-center">
          <Label className="w-24 pr-3">DOB: </Label>
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
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center justify-center">
          <Label className="w-24 pr-3">Password: </Label>
          <Input
            placeholder="Password"
            onChange={
              (e: ChangeEvent<HTMLInputElement>) =>
                setFormState({ ...formState, password: e.target.value })}
            type="password"
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
  );
}
