'use client'
import Image from "next/image";
import * as crypto from 'crypto';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
  url: z.string().url('Not a  valid url')
});


export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })

  const [shorter,setshorter] = useState('');


function generateShortUrl(longUrl: string): string {
  const hash = crypto.createHash('sha256').update(longUrl).digest('hex');
  const shortUrl = hash.substr(0, 8);
  return shortUrl;
}

function onSubmit(values: z.infer<typeof formSchema>) {
 const shorter = '/' + generateShortUrl(values.url);

  console.log(shorter);
}

const vercelUrl  = 'https://www.bla.com'

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col'>
        <h1 className="text-3xl underline">My Tools</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.google.com" {...field} />
                  </FormControl>
                  <FormDescription>
                      Write your url , get a shorter version
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          /> 
          <Button type="submit">Submit</Button>
          </form>
        </Form>
        {shorter.length > 0 ? <p>{shorter}</p> : <p>not yet</p>}
      </div>
    </main>
  );
}
