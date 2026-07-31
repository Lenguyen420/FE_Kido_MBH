import React, { useEffect, useState } from "react";
import StockHeader from "../../components/Stock/StockHeader";
import TableStock from "../../components/StockTakes/TableStock";
import { stockTakeApi } from "../../api";
import SidebarFilterStock from "../../components/StockTakes/SidebarFilterStock";

export default function StockTakes() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isWideView, setIsWideView] = useState(false);

  const loadRows = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await stockTakeApi.getAll();
      setRows(Array.isArray(data) ? data : []);
    } catch {
      setRows([]);
      setError("Không thể tải danh sách phiếu kiểm kho");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f5f7]">
      <div
        className={`mx-auto w-full px-3 py-4 sm:px-4 lg:px-5 ${
          isWideView ? "max-w-none" : "max-w-[1600px]"
        }`}
      >
        <StockHeader
          activeTab="takes"
          onRefresh={loadRows}
        />

        <div
          className={`mt-4 grid grid-cols-1 gap-4 ${
            isWideView ? "" : "xl:grid-cols-[320px_minmax(0,1fr)]"
          }`}
        >
          {!isWideView && (
            <aside className="min-w-0">
              <SidebarFilterStock />
            </aside>
          )}

          <div className="min-w-0 flex flex-col overflow-hidden border border-gray-300 bg-white shadow-sm rounded-xl">
            <TableStock
              rows={rows}
              loading={loading}
              error={error}
              onRefresh={loadRows}
              showFilterButton={isWideView}
              isWideView={isWideView}
              onToggleWideView={() => setIsWideView((current) => !current)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
