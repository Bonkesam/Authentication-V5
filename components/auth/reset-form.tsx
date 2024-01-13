"use client";


import * as z from "zod";
import { useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
 } from "@/components/ui/form";

import CardWrapper from './card-wrapper'
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import Link from "next/link";

const ResetForm = () => {

  const [error, setError] =  useState<string | undefined>("");
  const [success, setSuccess] =  useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
      .then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      })
    });
  }
  return (
    <CardWrapper
        headerLabel="Forgot your password?"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
       
    >
      <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      disabled={isPending}
                      placeholder = "johndoe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            
          </div>
          <FormError message={error}/>

          <FormSuccess  message={success}/>
          <Button disabled={isPending} type="submit" className="w-full">
            Reset email
          </Button> 
       </form>
      </Form>
    </CardWrapper>
  )
}

export default ResetForm;
