import React from "react";
import { FileText, RotateCcw } from "lucide-react";

export default function RecentActivities() {
  const data = [
    {
      type: "sale",
      user: "Hương - Kế Toán",
      text: "vừa bán đơn giao hàng",
      amount: "3,750,000",
      time: "6 days ago",
    },
    {
      type: "sale",
      user: "Nguyen Huu Phuoc",
      text: "vừa bán đơn hàng",
      amount: "300,000",
      time: "6 days ago",
    },
    {
      type: "sale",
      user: "Nguyen Huu Phuoc",
      text: "vừa bán đơn hàng",
      amount: "3,981,000",
      time: "6 days ago",
    },
    {
      type: "import",
      user: "Nguyen Huu Phuoc",
      text: "vừa nhập hàng",
      amount: "3,567,000",
      time: "6 days ago",
    },
    {
      type: "import",
      user: "Nguyen Huu Phuoc",
      text: "vừa nhập hàng",
      amount: "154,000",
      time: "6 days ago",
    },
    {
      type: "import",
      user: "Hương - Kế Toán",
      text: "vừa nhập hàng",
      amount: "3,618,000",
      time: "6 days ago",
    },
    {
      type: "import",
      user: "Hương - Kế Toán",
      text: "vừa nhập hàng",
      amount: "3,618,000",
      time: "6 days ago",
    },
  ];

  return (
<div className="h-[508px] bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 w-full max-w-[360px] mx-0 flex flex-col">      {/* TITLE */}
      <div className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">
        CÁC HOẠT ĐỘNG GẦN ĐÂY
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto pr-1 sm:pr-2">
  <div className="relative pl-5 sm:pl-8">

          {/* LINE */}
          <div className="absolute left-[11px] sm:left-[16px] top-0 bottom-0 w-[2px] bg-gray-200"></div>

          {data.map((item, i) => (
            <div key={i} className="relative mb-4 sm:mb-5 last:mb-0">

              {/* ICON */}
              <div
                className={`absolute left-0 top-1 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-white
                ${item.type === "sale" ? "bg-blue-500" : "bg-pink-500"}`}
              >
                {item.type === "sale" ? (
                  <FileText size={12} />
                ) : (
                  <RotateCcw size={12} />
                )}
              </div>

              {/* CONTENT */}
              <div className="ml-8 sm:ml-12">
                
                {/* TEXT */}
                <div className="text-xs sm:text-sm leading-5">
                  <span className="text-blue-600 font-medium">
                    {item.user}
                  </span>{" "}
                  <span className="text-gray-600">
                    {item.text}
                  </span>
                </div>

                {/* AMOUNT */}
                <div className="text-sm sm:text-base font-semibold text-gray-800">
                  {item.amount}
                </div>

                {/* TIME */}
                <div className="text-[11px] sm:text-xs text-gray-400 italic mt-0.5">
                  {item.time}
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}