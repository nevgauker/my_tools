"use server"
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

export async function saveQRImage(filename: string, url: string) {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/:/g, '-').slice(0, 19); // Get the date and time in YYYY-MM-DDTHH-MM-SS format

    const rootPath = process.cwd(); // Get the root directory of the project
    const folderPath = path.join(rootPath, 'qrs');
    const newFilename = `${formattedDate}_${filename}.png`; // Example filename: qr_2024-04-14T12-30-00_filename.png
    const imagePath = path.join(folderPath, newFilename);
    // Generate QR code image
    await QRCode.toFile(imagePath, url,{width:400});

    // Check if the image file exists
    if (fs.existsSync(imagePath)) {
      // Return the URL of the saved image
      const imageUrl = `/${newFilename}`; // Adjust this path as needed
      return imageUrl;
    } else {
      throw new Error('Failed to save QR code image');
    }
  } catch (error) {
    console.error('Error saving QR code image:', error);
    throw error;
  }
}
