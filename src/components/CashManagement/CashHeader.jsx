import React from "react";
import { RefreshCcw } from "lucide-react";

export default function CashHeader({ onRefresh }) {
  return (
    <div className="mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Quản lý tiền
        </h1>

        <button 
          onClick={onRefresh}
          className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
        >
          <RefreshCcw size={14} />
          Dữ liệu mới
        </button>
      </div>
    </div>
  );
}
