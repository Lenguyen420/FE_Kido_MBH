import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = [
  { label: "T2", value: 9 },
  { label: "T3", value: 1.5 },
  { label: "T4", value: 4 },
  { label: "T5", value: 14 },
  { label: "T6", value: 4.5 },
  { label: "T7", value: 3.5 },
  { label: "CN", value: 5.5 },
];

export default function SalesChart() {
  const [activeTab, setActiveTab] = useState("Theo thứ");
  const [filter, setFilter] = useState("Tháng trước");
  const [open, setOpen] = useState(false);
  const titleMap = {
    "Hôm nay": "DOANH SỐ HÔM NAY",
    "Hôm qua": "DOANH SỐ HÔM QUA",
    "7 ngày qua": "DOANH SỐ 7 NGÀY QUA",
    "Tháng này": "DOANH SỐ THÁNG NÀY",
    "Tháng trước": "DOANH SỐ THÁNG TRƯỚC",
  };

  // biểu đồ
  // ===== DATA =====
  const dataByDay = {
    labels: Array.from({ length: 26 }, (_, i) =>
      String(i + 1).padStart(2, "0")
    ),
    values: [
      3.8, 2.7, 0.2, 0.6, 0.5, 0.4, 0.4, 0.7, 4.8, 0.9,
      1.7, 1.1, 1.6, 2.8, 1.1, 0.7, 0.1, 0.4, 5.1, 2.4,
      0.4, 0.4, 1.5, 0.2, 1.4, 7.8,
    ],
  };

  const dataByHour = {
    labels: [
      "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
      "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
      "18:00", "19:00", "20:00", "21:00", "22:00",
    ],
    values: [
      3.9, 0.3, 5.2, 2.5, 1.0, 1.7, 2.8, 1.0, 4.3, 2.9, 0.6,
      5.8, 2.9, 0.8, 0.7, 2.2, 4.9
    ],
  };

  const dataByWeek = {
    labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    values: [9, 1.5, 4, 14, 4.5, 3.5, 5.5],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: false, // QUAN TRỌNG
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => (value === 0 ? "0" : value + " tr"),
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-5">

      {/* HEADER */}
      <div className="flex flex-col gap-2 mb-3">

        {/* TITLE */}
        <div className="text-sm font-semibold">
          {titleMap[filter]}
          <span className="text-blue-600 ml-2 font-bold">
            ● 43,575,000
          </span>
        </div>

        {/* DROPDOWN */}
        <div className="relative w-fit">
          <button
            onClick={() => setOpen(!open)}
            className="text-sm border px-3 py-1 rounded-md bg-gray-50 flex items-center gap-2"
          >
            {filter}
            <span
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""
                }`}
            >
              ▼
            </span>
          </button>

          {open && (
            <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow z-50">
              {[
                "Hôm nay",
                "Hôm qua",
                "7 ngày qua",
                "Tháng này",
                "Tháng trước",
              ].map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${filter === item
                      ? "font-semibold text-blue-600"
                      : ""
                    }`}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-4 sm:gap-6 text-sm mb-4 border-b border-gray-300 overflow-x-auto">
        {["Theo ngày", "Theo giờ", "Theo thứ"].map((tab) => (
          <span
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 whitespace-nowrap cursor-pointer ${activeTab === tab
                ? "border-b-2 border-blue-500 text-black font-medium"
                : "text-gray-400"
              }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* CHART (SCROLL NGANG MOBILE) */}
      {/* CHART */}
      <div className="w-full overflow-hidden">
  <div className="overflow-x-auto">
    <div className="w-[600px] h-[280px] sm:h-[350px]">
          <Bar
            data={{
              labels:
                activeTab === "Theo ngày"
                  ? dataByDay.labels
                  : activeTab === "Theo giờ"
                    ? dataByHour.labels
                    : dataByWeek.labels,
              datasets: [
                {
                  label: "Chi nhánh trung tâm",
                  data:
                    activeTab === "Theo ngày"
                      ? dataByDay.values
                      : activeTab === "Theo giờ"
                        ? dataByHour.values
                        : dataByWeek.values,
                  backgroundColor: "#2563eb",
                  borderRadius: 4,
                },
              ],
            }}
            options={options}
          />
        </div>
      </div>
      </div>
    </div>
  );
}