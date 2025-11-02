"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { addPasswordServer } from "@/actions/actions"


const formSchema = z.object({
  website: z.string()
    .min(1, "Website is required.")
    .max(200, "Website must be less than 200 characters.")
    .trim(),
  username: z.string()
    .min(3, "Username must be at least 3 characters.")
    .max(100, "Username must be less than 100 characters.")
    .trim(),
  password: z.string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be less than 128 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
})

export function AddPassword() {
 
  const user = useUser()
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username: "",
      password: "",
      
    }
  })

  

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    if(user.user){
      addPasswordServer (values.website, values.username, values.password, user?.user?.id)
      toast.success("Password added successfully!")
      form.reset()
      router.refresh()
    }
  }

  

  return (
    <Card className="border-primary/20 bg-card p-6">


     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-13">
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Website Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your Website Name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your Username.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
                This is your Password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
    
        <Button type="submit">Submit</Button>
      </form>
    </Form>


     
    </Card>
  )
}