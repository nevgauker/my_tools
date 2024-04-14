'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import Image from 'next/image'


interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = ({  }) => {
  return (
    <div className='flex justify-between items-center my-4'>
      <NavigationMenu dir={'ltr'}>
        <NavigationMenuList>
          {/* <NavigationMenuItem>
            <NavigationMenuLink asChild className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 transition-transform hover:scale-110'>
              <Link href='/' legacyBehavior passHref>
                  <NavigationMenuLink className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 transition-transform hover:scale-110'>
                    <Image
                      src={'/logo.png'}
                      alt='logo'
                      width={50}
                      height={50}
                    />
                  </NavigationMenuLink>
                </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <div className='flex flex-col'>
              <Link href={'/tools/url_shorter'}>
                    
                    <div className='flex items-center'>
                        <Image width={44}  height={44} src={'/url.png'} alt={'url'} />
                        <div className='text-xl pl-2'>Url Shorter</div>
                    </div>
              </Link>

              <Link href={'/tools/qr_code_genetator'}>
                    <div className='flex items-center'>
                    <Image width={44}  height={44} src={'/qr.png'} alt={'qr'} />
                        <div className='text-xl pl-2'>QR code generator</div>
                    </div>
              </Link>

               
              </div>

            </div>

           
            
          </NavigationMenuContent>

          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 transition-transform hover:scale-110'>
              <Link href='/' legacyBehavior passHref>
                  <NavigationMenuLink className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 transition-transform hover:scale-110'>
                    <Image
                      src={'/logo.png'}
                      alt='logo'
                      width={50}
                      height={50}
                    />
                  </NavigationMenuLink>
                </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          

          <NavigationMenuItem>
            <Link href={'/tools/url_shorter'} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                URL
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={'/tools/qr_code_genetator'} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                QR
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default Navbar
