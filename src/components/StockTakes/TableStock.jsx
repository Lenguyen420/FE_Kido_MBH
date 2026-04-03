import React from "react";

export default function TableStock() {
  const data = []; // hiện đang trống như UI mẫu

  return (
    <div className="bg-white rounded-xl shadow p-4 flex-1">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Phiếu kiểm kho</h2>

        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            + Kiểm kho
          </button>

          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Xuất file
          </button>
          
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2">
              <input type="checkbox" />
            </th>
            <th>Mã kiểm kho</th>
            <th>Thời gian</th>
            <th>Ngày cân bằng</th>
            <th>Tổng chênh lệch</th>
            <th>SL lệch tăng</th>
            <th>SL lệch giảm</th>
            <th>Ghi chú</th>
            <th>Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center py-20 text-gray-400">
                <div className="flex flex-col items-center">
                  📦
                  <p className="mt-2">
                    Không tìm thấy phiếu kiểm kho nào phù hợp
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}