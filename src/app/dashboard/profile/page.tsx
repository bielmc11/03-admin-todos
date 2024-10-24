import { UserSession } from "@/auth/components/UserSession";
import { SessionProvider } from "next-auth/react";

export default function NamePage() {
  return (
    <SessionProvider>
      <UserSession />
    </SessionProvider>
  );
}
