"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  path: string;
}



export const SidebarItem = ({ path, title, icon }: Props) => {
  const pathName = usePathname();

  const activeParam = () => {
    return pathName === path
      ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
      : "hover:bg-sky-600 hover:text-white";
  };

  //TODO : CREO QUE EL LAYOUT DEBERIA PONERLO EN EL ROOT NO EN CATEGORIES O METER MAIN Y CATEGORIES DENTRO DE DASHBOARD
  return (
    <ul className="space-y-2 tracking-wide mt-2">
      <li>
        <Link
          href={path}
          className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${activeParam()}`}
        >
          {icon}
          <span className="-mr-1 font-medium"> {title} </span>
        </Link>
      </li>
    </ul>
  );
};
