import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server'

interface ImageResult {
  data?: Buffer;
  error?: Error;
}

async function getImageData(imageName: string): Promise<ImageResult> {
  try {
      const imageData = await fs.promises.readFile(imageName);
      return { data: imageData };
  } catch (error) {
      if (error instanceof Error) {
          return { error };
      } else {
          return { error: new Error(`Failed to read file: ${imageName}`) };
      }
  }
}

export async function GET(req: NextRequest, { params }: { params: { filename: string }})  {
  const filename = params.filename

  if (!filename || typeof filename !== 'string') {
    return NextResponse.json({ error: 'Filename parameter is missing or invalid', details: new Error(`Failed to read file: ${filename}`)  }, {
      status: 500,
    });
  }

  try {
    const imagePath: string = path.join(process.cwd(), 'qrs', filename);
    const res  = await getImageData(imagePath);
    if (res.error === undefined && res.data){
      const response = new NextResponse(res.data)
      response.headers.set('content-type', 'image/*');
      return response;
    }else{
      return NextResponse.json({ error: 'Error reading image file x', details: res.error }, {
        status: 500,
      });
    }
  } catch (err) {
    console.error('Error reading image file:', err);
    return NextResponse.json({ error: 'Error reading image file y', details: err }, {
      status: 500,
    });
  }
}

