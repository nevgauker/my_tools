'use client'
import { useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation'



export default function Shorter() {
    const pathname = usePathname()
    const searchParams = useSearchParams()



    useEffect(() => {

        console.log(pathname);
        console.log(searchParams);
       // window.location.assign('https://www.rotemnev.com/')
    },[])
    return <></>

}