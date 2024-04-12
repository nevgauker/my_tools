'use client'

import { fecthUrl } from "@/actions/fetch_url";

export default async function Shorter({ params }: {params: {shorter : string }}) {


    async function redirect(){
      console.log(params.shorter)
      const baseUrl = process.env.VERCEL_URL ?? 'http://localhost:3000/'
      const url = await fecthUrl(params.shorter);
      console.log(url);

      if (url){
        //redirect
        window.location.assign(url.url);
      }

    }
    redirect()
    return <></>
}

