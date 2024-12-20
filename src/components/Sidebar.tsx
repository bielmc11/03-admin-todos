import Image from "next/image";
import React from "react";
import { CiBookmarkCheck, CiLogout } from "react-icons/ci";
import { SidebarItem } from "./SidebarItem";
import Link from "next/link";
import {
  IoBaseballOutline,
  IoCalendarOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";
import { auth } from "@/auth";
import { SessionProvider, signOut } from "next-auth/react";
import { LogOutButton } from "./LogOutButton";

const menu = [
  {
    path: "/dashboard",
    icon: <IoCalendarOutline size={30} />,
    title: "Dashboard",
  },
  {
    //El tiene aqui rest-todos
    path: "/dashboard/rest-todos",
    icon: <CiBookmarkCheck size={30} />,
    title: "Rest Todos",
  },
  {
    //El tiene aqui rest-todos
    path: "/dashboard/server-actions",
    icon: <IoListOutline size={30} />,
    title: "Server Actions",
  },
  {
    path: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline size={30} />,
    title: "Cookies",
  },
  {
    path: "/dashboard/products",
    icon: <IoBaseballOutline size={30} />,
    title: "Products",
  },
  {
    path: "/dashboard/profile",
    icon: <IoPersonOutline size={30} />,
    title: "Profile",
  },
];

export const Sidebar = async () => {
  const session = await auth();
  const userImage = session?.user?.image
    ? session?.user?.image
    : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  const userName = session?.user?.name ?? "Name unknown";
  const userRol = session?.user?.roles ?? ["Client"];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              alt="tailus logo"
              width={150}
              height={150}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={userImage}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={112}
            height={112}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRol.join(",")}
          </span>
        </div>

        <div className="mt-6">
          {menu.map((items) => {
            return <SidebarItem key={items.title} {...items} />;
          })}
        </div>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <SessionProvider>
          <LogOutButton />
        </SessionProvider>
      </div>
    </aside>
  );
};
