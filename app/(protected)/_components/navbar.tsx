'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Navbar = () => {

    const pathname = usePathname();

  return (
    <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm'>
      <div className='flex gap-x-2'>
      <Button asChild
            variant={pathname === '/settings' ? "default" : "outline"}
        >
            <Link href="/settings">
                Setting
            </Link>
        </Button>

        <Button asChild
            variant={pathname === '/server' ? "default" : "outline"}
        >
            <Link href="/server">
                Server
            </Link>
        </Button>
        <Button asChild
            variant={pathname === '/client' ? "default" : "outline"}
        >
            <Link href="/server">
                Client
            </Link>
        </Button>

        <Button asChild
            variant={pathname === '/admin' ? "default" : "outline"}
        >
            <Link href="/server">
                Admin
            </Link>
        </Button>


      </div>
      <p>user Button</p>
    </nav>
  )
}

export default Navbar;
