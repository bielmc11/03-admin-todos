import { TabBar } from "@/components";

export const metadata = {
  title: "Cookies page",
  description: "Seo title",
};

export default function CookiesPage() {
  return (
    <div>
      <span className="text-3xl">Cookies</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-center w-full">
        <TabBar />
      </div>
    </div>
  );
}
