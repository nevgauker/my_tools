'use client'

import { NextPage } from "next"
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
import prisma from "@/lib/prisma";
import { createUrl } from "@/actions/create_url";
import Link from "next/link";
import { fecthUrlByFull } from "@/actions/fetch_url_full";
import { useToast } from "@/components/ui/use-toast";
import { Container } from "@/components/container";


const formSchema = z.object({
  url: z.string().url('Not a  valid url')
});


const UrlShorterPage:NextPage = () =>  {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })

  const [shorter,setshorter] = useState('');


  function removeFirstCharacter(inputString: string): string {
    // Check if the string is not empty
    if (inputString.length > 0) {
        // Return the substring starting from index 1 (excluding the first character)
        return inputString.substring(1);
    } else {
        // If the string is empty, return it as is
        return inputString;
    }
}

function generateShortUrl(longUrl: string): string {
  const hash = crypto.createHash('sha256').update(longUrl).digest('hex');
  const shortUrl = removeFirstCharacter(hash.substr(0, 8));
  return shortUrl;
}

async  function onSubmit(values: z.infer<typeof formSchema>) {
  const baseUrl = process.env.VERCEL_URL ?? 'http://localhost:3000/'

 const url = await fecthUrlByFull(values.url);
 

if (!url){
  const shorter = generateShortUrl(values.url);
  const newUrl = await createUrl(values.url,shorter);
  setshorter(baseUrl + shorter ) 
}else{
  setshorter(baseUrl + url.shorterUrl) 
}
}


  async function copy(txt:string) {
    if (navigator){
      await navigator.clipboard.writeText(txt);
       toast({
        title: "Copy",
        description: "Copy",
      })
    }
  }

  return (
    <Container>
        <h1 className="text-3xl mb-24">Url Shorter Tool</h1>
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
          <div className="flex justify-center items-center">
            <Button type="submit">Submit</Button>
          </div> 
          </form>
        </Form>

        {shorter.length > 0 ? 
       
            <div className="flex flex-col justify-center items-center">
              <Link href={shorter}> 
                <h2 className="text-2xl underline">
                  Here is your shorter url
                </h2>
              </Link>
              <p>{shorter}</p>
              <div className="flex justify-center  items-center"> 
              
              <Button onClick={ () => copy(shorter) }>Copy</Button>
              <Link href={shorter}>Open</Link>
              </div>
          </div>
       
         :
         <></>}
</Container>
  );
}

export default UrlShorterPage