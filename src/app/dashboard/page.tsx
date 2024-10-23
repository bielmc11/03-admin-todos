import { auth } from "@/auth";
import { WidgetItem } from "@/components";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {

  const session = await auth()
  console.log("session", session)
  if(!session?.user){
    redirect("/api/auth/signin")
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
       <WidgetItem title="Sesion activa">
        {
          JSON.stringify(session?.user)
        }
       </WidgetItem>

    </div>
  );
}
