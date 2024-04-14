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
import { saveQRImage } from "@/actions/save_qr_image";

import { baseUrl } from "@/lib/consts";


const formSchema = z.object({
    url: z.string().url('Not a  valid url')
  });

  
const QRCodeGenetatorPage:NextPage = () => {
  const [imageUrl,setImageUrl] = useState('')
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  })


  function download(){
    const url = `${baseUrl}api/images/${imageUrl}`
    window.open(url)
  }
  function send(){}

  async function generateQRCode(url: string, filename: string) {
    try {
       const imageUrl =  await saveQRImage(filename, url);
       setImageUrl(imageUrl)
        console.log(`QR code generated and saved as ${filename}`);
    } catch (err) {
        console.error('Error generating QR code:', err);
    }
}

  async  function onSubmit(values: z.infer<typeof formSchema>) {
    const url = values.url;
    const filename = 'qrcode.png';
    generateQRCode(url, filename);
  }

  console.log(imageUrl)

  return (
      <Container>
        <h1 className="text-3xl mb-24">QR Code Generator</h1>
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
                      Gennerate QR code from your url
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          /> 
            <div className="flex items-center justify-center">
            <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>


      {
      imageUrl && 
          <div className="flex flex-col space-y-5">
            <Image width={400} height={400} src={`${baseUrl}api/images/${imageUrl}`} alt={"qr"}/> 
            <div className="flex justify-evenly">
              <Button onClick={()=> download()}>Download</Button>
              <Button onClick={()=> send()}>Send</Button>
            </div>
          </div>
      }
      </Container>
   
  );
 
}
export default QRCodeGenetatorPage