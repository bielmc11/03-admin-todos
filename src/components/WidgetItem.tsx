import React from "react";
interface Props {
  title: string;
  children: React.ReactNode;
}

export const WidgetItem = ({ title, children }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
        <div>
          <h5 className="text-xl text-gray-600 text-center">
            Global Activities
          </h5>
          <div className="mt-2 flex justify-center gap-4">
            <div className="block text-center text-gray-500">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
