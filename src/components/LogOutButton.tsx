"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import {  AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";

export const LogOutButton = () => {
  const { data: session, status } = useSession();

  const onLogOut = async () => {
    signOut();
  };

  return (
    <button
      onClick={onLogOut}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      {status === "loading" ? (
        <div className="flex items-center gap-2">
        < AiOutlineLoading3Quarters/>
        <span className="group-hover:text-gray-700">LOANDING...</span>
      </div>
      ) : (
        <div className="flex items-center gap-2">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </div>
      )}
    </button>
  );
};
