"use server"
import prisma from "@/lib/prisma";


export async function fecthUrl(shorter:string) {
    const url = await prisma.url.findFirst({ where: { shorterUrl:shorter } });
    return url;

}

export async function fecthUrlByFull(url:string) {
    const urlObj = await prisma.url.findFirst({ where: { url:url } });
    return urlObj;

}
