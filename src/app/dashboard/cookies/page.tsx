import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies page",
  description: "Seo title",
};

export default function CookiesPage() {
  const misCookies = cookies();
  const miTab = Number(misCookies.get('selectedTab')?.value) ?? 1
  console.log(miTab)
  return (
    <div>
      <span className="text-3xl">Cookies</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center w-full">
        <TabBar currentTab={miTab}/>
      </div>
    </div>
  );
}
