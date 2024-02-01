import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { CiLogout } from 'react-icons/ci'
import { SidebarItem } from './SidebarItem'
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPerson } from 'react-icons/io5'
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { LogoutButton } from './LogoutButton'
const menuItems = [
  {
    id: 1,
    path: '/dashboard',
    icon: <IoCalendarOutline size={30} />,
    title: 'Dashboard',
  },
  {
    id: 2,
    path: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline size={30} />,
    title: 'Rest TODOS',
  },
  {
    id: 3,
    path: '/dashboard/server-todos',
    icon: <IoListOutline size={30} />,
    title: 'Server Actions',
  },
  {
    id: 4,
    path: '/dashboard/cookies',
    icon: <IoCodeWorkingOutline size={30} />,
    title: 'Cookies',
  },
  {
    id: 5,
    path: '/dashboard/products',
    icon: <IoBasketOutline size={30} />,
    title: 'Productos'
  },
  {
    id: 6,
    path: '/dashboard/profile',
    icon: <IoPerson size={30} />,
    title: 'Perfil'
  }
]

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect('/api/auth/signin');
  // }
  const userRoles = session?.user?.roles ?? ['client'];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard">
            <Image width={30} height={30} src={"https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"} className="w-32" alt="tailus logo" ></Image>
          </Link>
        </div>

        {session ? (
          <div className="mt-8 text-center">
            <Image width={30} height={30} src={session.user?.image ?? "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"} alt="Imagen de perfil" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"></Image>
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{ }</h5>
            <span className="hidden text-gray-400 lg:block capitalize">
              {userRoles.join(',')}
            </span>
          </div>
        ) : null}


        <ul className="space-y-2 tracking-wide mt-8">
          {
            menuItems.map(item => (
              <SidebarItem
                key={item.id}
                {...item}
              />
            ))
          }

        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        {/* 
          for server side
        */}
        {/* <Link
          href={'/api/auth/signout'}
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </Link> */}
        <LogoutButton />
      </div>
    </aside>
  )
}
