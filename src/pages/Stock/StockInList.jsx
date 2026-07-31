import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stockInApi } from "../../api";
import StockHeader from "../../components/Stock/StockHeader";
import StockInDetailTable from "../../components/StockIn/StockInDetailTable";
import StockInListTable from "../../components/StockIn/StockInListTable";
import StockInListToolbar from "../../components/StockIn/StockInListToolbar";
import StockInPagination from "../../components/StockIn/StockInPagination";
import StockSidebarFilters from "../../components/Stock/StockSidebarFilters";

export default function StockInList() {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [loadedDetailIds, setLoadedDetailIds] = useState(() => new Set());
  const [error, setError] = useState("");
  const [isWideView, setIsWideView] = useState(false);

  const loadReceipts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await stockInApi.getAll();
      setReceipts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Không thể tải danh sách phiếu nhập kho"
      );
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReceipts();
  }, []);

  const filteredReceipts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (!keyword) return receipts;

    return receipts.filter((receipt) =>
      [
        receipt.postedDate,
        receipt.voucherNo,
        receipt.description,
        receipt.deliverer,
        receipt.voucherType,
        receipt.branch,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [receipts, searchKeyword]);

  useEffect(() => {
    if (!filteredReceipts.length) {
      setSelectedReceiptId(null);
      return;
    }

    const selectedStillVisible = filteredReceipts.some(
      (receipt) => receipt.id === selectedReceiptId
    );

    if (!selectedStillVisible) {
      setSelectedReceiptId(filteredReceipts[0].id);
    }
  }, [filteredReceipts, selectedReceiptId]);

  useEffect(() => {
    const selectedReceipt = receipts.find(
      (receipt) => receipt.id === selectedReceiptId
    );

    if (
      !selectedReceipt ||
      selectedReceipt.details?.length ||
      loadedDetailIds.has(selectedReceipt.id)
    ) {
      return;
    }

    let ignore = false;

    const loadDetail = async () => {
      try {
        setDetailLoading(true);
        setLoadedDetailIds((prev) => new Set(prev).add(selectedReceipt.id));
        const receiptDetail = await stockInApi.getById(selectedReceipt.id);
        if (ignore) return;

        setReceipts((prev) =>
          prev.map((receipt) =>
            receipt.id === selectedReceipt.id
              ? { ...receipt, ...receiptDetail }
              : receipt
          )
        );
      } catch (err) {
        if (!ignore) {
          setError(
            err?.response?.data?.message || "Không thể tải chi tiết phiếu nhập kho"
          );
        }
      } finally {
        if (!ignore) setDetailLoading(false);
      }
    };

    loadDetail();

    return () => {
      ignore = true;
    };
  }, [loadedDetailIds, receipts, selectedReceiptId]);

  const visibleReceipts = filteredReceipts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const selectedReceipt =
    filteredReceipts.find((receipt) => receipt.id === selectedReceiptId) ||
    filteredReceipts[0] ||
    null;

  const handleCreateClick = () => {
    navigate("/stock-in/create");
  };

  const handleSearchChange = (value) => {
    setSearchKeyword(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f3f5f7]">
      <div
        className={`mx-auto w-full px-3 py-4 sm:px-4 lg:px-5 ${
          isWideView ? "max-w-none" : "max-w-[1600px]"
        }`}
      >
        <StockHeader
          activeTab="in"
          onRefresh={loadReceipts}
        />

        <div
          className={`mt-4 grid grid-cols-1 gap-4 ${
            isWideView ? "" : "xl:grid-cols-[320px_minmax(0,1fr)]"
          }`}
        >
          {!isWideView && (
            <aside className="min-w-0">
              <StockSidebarFilters type="in" />
            </aside>
          )}

          <div className="min-w-0 flex flex-col overflow-hidden border border-gray-300 bg-white shadow-sm rounded-xl">
            <StockInListToolbar
              searchKeyword={searchKeyword}
              onSearchChange={handleSearchChange}
              onCreateClick={handleCreateClick}
              showFilterButton={isWideView}
              isWideView={isWideView}
              onToggleWideView={() => setIsWideView((current) => !current)}
            />

          {(loading || detailLoading || error) && (
            <div className="border-b border-gray-300 bg-white px-4 py-3 text-sm">
              {loading && (
                <span className="text-slate-500">Đang tải dữ liệu...</span>
              )}
              {!loading && detailLoading && (
                <span className="text-slate-500">Đang tải chi tiết...</span>
              )}
              {error && <span className="text-red-600">{error}</span>}
            </div>
          )}

          <StockInListTable
            receipts={visibleReceipts}
            selectedReceipt={selectedReceipt}
            onSelectReceipt={setSelectedReceiptId}
          />

          <StockInPagination
            total={filteredReceipts.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />

            <StockInDetailTable receipt={selectedReceipt} />
          </div>
        </div>
      </div>
    </div>
  );
}
