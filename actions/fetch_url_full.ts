"use server"
import prisma from "@/lib/prisma";

export async function fecthUrlByFull(url:string) {
    const urlObj = await prisma.url.findFirst({ where: { url:url } });
    return urlObj;

}