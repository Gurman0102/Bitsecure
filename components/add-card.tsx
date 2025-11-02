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
import { addCardServer } from "@/actions/actions"


const formSchema = z.object({
  cardHolderName: z.string().min(2, {
    message: "Card holder name must be at least 2 characters.",
  }),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: "Card number must be 16 digits.",
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in MM/YY format.",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "CVV must be 3 or 4 digits.",
  }),
})

export function AddCard() {
 
  const user = useUser()
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    }
  })

  

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    if(user.user){
      addCardServer (values.cardNumber, values.expiryDate, values.cvv, values.cardHolderName, user?.user?.id)
      toast.success("Card added successfully!")
      form.reset()
      router.refresh();
    }
  }

  

  return (
    <Card className="border-primary/20 bg-card p-6">


     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="cardHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CardHolder Name</FormLabel>
              <FormControl>
                <Input placeholder="CardHolder Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your CardHolder Name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input placeholder="CardNumber" {...field} />
              </FormControl>
              <FormDescription>
                This is your CardNumber.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input placeholder="Expiry Date" {...field} />
              </FormControl>
              <FormDescription>
                This is your Expiry Date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card CVV</FormLabel>
              <FormControl>
                <Input placeholder="Card CVV" {...field} />
              </FormControl>
              <FormDescription>
                This is your Card CVV.
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
