"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export const UserSession = () => {
  const { data: session, status } = useSession();

  if(status === 'unauthenticated'){
    redirect('/api/auth/signin')
  }

  if(status === 'loading'){
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>
        Pagina de prueba para probar el wrapper crado para usar sesion en Client
        components
      </h1>
      <div>
        <p>{session?.user?.name}</p>
        <p>{session?.user?.email}</p>
        <Image
          src={session?.user?.image ?? "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"}
          alt="user avatar"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};
