import React from "react";
import { DollarSign, Clock, Users } from "lucide-react";

export default function Summary() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
      
      {/* TITLE */}
      <div className="font-semibold text-gray-800 mb-4 text-sm sm:text-base">
        KẾT QUẢ BÁN HÀNG HÔM NAY
      </div>

      {/* CONTENT */}
      <div className="flex flex-col sm:grid sm:grid-cols-3 sm:divide-x">
        
        {/* ITEM 1 */}
        <div className="flex items-center gap-4 py-3 sm:py-0 sm:px-4 border-b sm:border-b-0">
          <div className="bg-blue-500 text-white w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center">
            <DollarSign size={18} />
          </div>

          <div>
            <div className="text-sm text-gray-600">3 đơn đã xong</div>
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              8,031,000
            </div>
            <div className="text-xs text-gray-400">
              Hôm qua 1,512,000
            </div>
          </div>
        </div>

        {/* ITEM 2 */}
        <div className="flex items-center gap-4 py-3 sm:py-0 sm:px-4 border-b sm:border-b-0">
          <div className="bg-green-500 text-white w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center">
            <Clock size={18} />
          </div>

          <div>
            <div className="text-sm text-gray-600">Đang phục vụ</div>
            <div className="text-lg sm:text-xl font-bold text-green-600">
              0
            </div>
          </div>
        </div>

        {/* ITEM 3 */}
        <div className="flex items-center gap-4 py-3 sm:py-0 sm:px-4">
          <div className="bg-red-500 text-white w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center">
            <Users size={18} />
          </div>

          <div>
            <div className="text-sm text-gray-600">Khách hàng</div>
            <div className="text-lg sm:text-xl font-bold text-red-500">
              7
            </div>
            <div className="text-xs text-gray-400">Hôm qua 8</div>
          </div>
        </div>

      </div>
    </div>
  );
}