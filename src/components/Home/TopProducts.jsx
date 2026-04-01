// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function TopProducts() {
//   const [filter, setFilter] = useState("Tháng trước");
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState("quantity"); // mặc định giống ảnh
//   const [openMode, setOpenMode] = useState(false);


//   //DATA
//   const dataRevenue = [
//     { name: "Súp kem gà nữ hoàng", value: 6.3 },
//     { name: "Đĩa thịt nguội Tây Ban Nha", value: 5.8 },
//     { name: "Súp kem bí đỏ với sữa dừa", value: 5.8 },
//     { name: "Xúc xích Đức nướng mù tạt vàng", value: 5.2 },
//     { name: "Thịt nguội & phô mai viên chiên", value: 3.9 },
//     { name: "Súp hành tây kiểu Pháp", value: 3.0 },
//     { name: "Súp kem kiểu Paris", value: 2.8 },
//     { name: "Súp kem rau 4 mùa", value: 2.1 },
//     { name: "MILANO", value: 1.4 },
//     { name: "Thuốc lá Kent HD", value: 1.0 },
//   ];

//   const dataQuantity = [
//     { name: "Lipton with milk", value: 58 },
//     { name: "Súp kem gà nữ hoàng", value: 52 },
//     { name: "MILANO", value: 48 },
//     { name: "Đĩa thịt nguội Tây Ban Nha", value: 48 },
//     { name: "Súp kem bí đỏ với sữa dừa", value: 48 },
//     { name: "Xúc xích Đức nướng mù tạt vàng", value: 42 },
//     { name: "Thuốc lá Kent HD", value: 36 },
//     { name: "BLOODY MARY", value: 31 },
//     { name: "Thịt nguội & phô mai viên chiên", value: 31 },
//     { name: "GIN FIZZ", value: 29 },
//   ];

//   const currentData = mode === "revenue" ? dataRevenue : dataQuantity;
//   // ===== CHART DATA =====
//   const chartData = {
//     labels: currentData.map((item) => item.name),
//     datasets: [
//       {
//         data: currentData.map((item) => item.value),
//         backgroundColor: "#1d8acb",
//         borderRadius: 4,
//       },
//     ],
//   };

//   // ===== OPTIONS =====
//   const options = {
//     indexAxis: "y",
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value) => {
//             if (mode === "revenue") {
//               return value === 0 ? "0" : value + " tr";
//             }
//             return value; // số lượng
//           },
//         },
//         grid: {
//           color: "#e5e7eb",
//         },
//       },
//       y: {
//         grid: { display: false },
//       },
//     },
//   };

//   return (
//     <div className="bg-white rounded-xl shadow p-5">
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
//        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
//           <span>
//             TOP 10 HÀNG HÓA BÁN CHẠY {filter.toUpperCase()}
//           </span>

//           {/* DROPDOWN MODE */}
//           <div className="relative">
//             <button
//               onClick={() => setOpenMode(!openMode)}
//               className="text-blue-600 text-sm font-medium flex items-center gap-1"
//             >
//               {mode === "revenue" ? "THEO DOANH THU" : "THEO SỐ LƯỢNG"}
//               <span className={`transition-transform ${openMode ? "rotate-180" : ""}`}>
//                 ▼
//               </span>
//             </button>

//             {openMode && (
//              <div className="absolute sm:left-0 right-0 mt-2 w-44 bg-white border rounded shadow z-10">
//                 <div
//                   onClick={() => {
//                     setMode("revenue");
//                     setOpenMode(false);
//                   }}
//                   className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${mode === "revenue" ? "text-blue-600 font-semibold" : ""
//                     }`}
//                 >
//                   Theo doanh thu {mode === "revenue" && "✔"}
//                 </div>

//                 <div
//                   onClick={() => {
//                     setMode("quantity");
//                     setOpenMode(false);
//                   }}
//                   className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${mode === "quantity" ? "text-blue-600 font-semibold" : ""
//                     }`}
//                 >
//                   Theo số lượng {mode === "quantity" && "✔"}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* DROPDOWN */}
//         <div className="relative">
//           <button
//             onClick={() => setOpen(!open)}
//             className="text-sm border px-3 py-1 rounded-md bg-gray-50 flex items-center gap-2"
//           >
//             {filter}
//             <span
//               className={`transition-transform ${open ? "rotate-180" : ""
//                 }`}
//             >
//               ▼
//             </span>
//           </button>

//           {open && (
//             <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-10">
//               {[
//                 "Hôm nay",
//                 "Hôm qua",
//                 "7 ngày qua",
//                 "Tháng này",
//                 "Tháng trước",
//               ].map((item) => (
//                 <div
//                   key={item}
//                   onClick={() => {
//                     setFilter(item);
//                     setOpen(false);
//                   }}
//                   className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${filter === item ? "text-blue-600 font-semibold" : ""
//                     }`}
//                 >
//                   {item}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* CHART */}
//       <div className="w-full overflow-x-auto">
//         <div className="min-w-[700px]">
//           <Bar data={chartData} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
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

export default function TopProducts() {
  const [filter, setFilter] = useState("Tháng trước");
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState("quantity");
  const [openMode, setOpenMode] = useState(false);

  // ===== DATA =====
  const dataRevenue = [
    { name: "Súp kem gà nữ hoàng", value: 6.3 },
    { name: "Đĩa thịt nguội Tây Ban Nha", value: 5.8 },
    { name: "Súp kem bí đỏ với sữa dừa", value: 5.8 },
    { name: "Xúc xích Đức nướng mù tạt vàng", value: 5.2 },
    { name: "Thịt nguội & phô mai viên chiên", value: 3.9 },
    { name: "Súp hành tây kiểu Pháp", value: 3.0 },
    { name: "Súp kem kiểu Paris", value: 2.8 },
    { name: "Súp kem rau 4 mùa", value: 2.1 },
    { name: "MILANO", value: 1.4 },
    { name: "Thuốc lá Kent HD", value: 1.0 },
  ];

  const dataQuantity = [
    { name: "Lipton with milk", value: 58 },
    { name: "Súp kem gà nữ hoàng", value: 52 },
    { name: "MILANO", value: 48 },
    { name: "Đĩa thịt nguội Tây Ban Nha rất dài nè", value: 48 },
    { name: "Súp kem bí đỏ với sữa dừa", value: 48 },
    { name: "Xúc xích Đức nướng mù tạt vàng", value: 42 },
    { name: "Thuốc lá Kent HD", value: 36 },
    { name: "BLOODY MARY", value: 31 },
    { name: "Thịt nguội & phô mai viên chiên", value: 31 },
    { name: "GIN FIZZ", value: 29 },
  ];

  const currentData = mode === "revenue" ? dataRevenue : dataQuantity;

  // ===== CHART DATA =====
  const chartData = {
    labels: currentData.map((item) => item.name),
    datasets: [
      {
        data: currentData.map((item) => item.value),
        backgroundColor: "#1d8acb",
        borderRadius: 4,
      },
    ],
  };

  // ===== OPTIONS =====
  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return mode === "revenue"
              ? context.raw + " triệu"
              : context.raw + " sản phẩm";
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            mode === "revenue"
              ? value === 0
                ? "0"
                : value + " tr"
              : value,
        },
        grid: { color: "#e5e7eb" },
      },
      y: {
        grid: { display: false },
        ticks: {
          callback: function (value) {
            const label = this.getLabelForValue(value);
            return label.length > 25
              ? label.slice(0, 25) + "..."
              : label;
          },
        },
      },
    },
  };

  // ===== CLICK OUTSIDE =====
  useEffect(() => {
    const handleClick = () => {
      setOpen(false);
      setOpenMode(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-5">
      
      {/* HEADER */}
      <div className="flex flex-col gap-2 mb-4">
        
        {/* TITLE */}
        <div className="text-sm font-semibold">
          TOP 10 HÀNG HÓA BÁN CHẠY {filter.toUpperCase()}
        </div>

        {/* DROPDOWNS */}
        <div className="flex flex-wrap gap-3">
          
          {/* MODE */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenMode(!openMode)}
              className="text-blue-600 text-sm font-medium flex items-center gap-1"
            >
              {mode === "revenue"
                ? "THEO DOANH THU"
                : "THEO SỐ LƯỢNG"}
              <span
                className={`transition-transform duration-200 ${
                  openMode ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {openMode && (
              <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow z-50">
                <div
                  onClick={() => {
                    setMode("revenue");
                    setOpenMode(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    mode === "revenue"
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Theo doanh thu {mode === "revenue" && "✔"}
                </div>

                <div
                  onClick={() => {
                    setMode("quantity");
                    setOpenMode(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    mode === "quantity"
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Theo số lượng {mode === "quantity" && "✔"}
                </div>
              </div>
            )}
          </div>

          {/* FILTER */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(!open)}
              className="text-sm border px-3 py-1 rounded-md bg-gray-50 flex items-center gap-2"
            >
              {filter}
              <span
                className={`transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {open && (
              <div className="absolute left-0 mt-2 w-44 bg-white border rounded shadow z-50">
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
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      filter === item
                        ? "text-blue-600 font-semibold"
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
      </div>

      {/* CHART (SCROLL MOBILE) */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] h-[350px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>

    </div>
  );
}