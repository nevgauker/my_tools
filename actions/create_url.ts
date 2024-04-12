"use server"
import prisma from "@/lib/prisma";


export async function createUrl(url:string,shorterUrl:string) {
    const newUrl = await prisma.url.create({
        data: {
            url,
            shorterUrl
        },
      });
   return newUrl;   
}