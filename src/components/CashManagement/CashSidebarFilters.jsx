import React, { useEffect, useRef } from "react";

export default function CashSidebarFilters({ filters, setFilters }) {
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      const activeDateInput = [fromDateRef.current, toDateRef.current].find(
        (input) => input === document.activeElement,
      );

      if (activeDateInput && event.target !== activeDateInput) {
        activeDateInput.blur();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl bg-white p-4 shadow">
        <p className="mb-3 font-medium">Tìm kiếm</p>
        <input
          value={filters?.search || ""}
          onChange={(event) =>
            setFilters?.((current) => ({
              ...current,
              search: event.target.value,
            }))
          }
          placeholder="Theo số phiếu, đối tượng"
          className="w-full rounded-lg border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="rounded-xl bg-white p-4 shadow">
        <p className="mb-3 font-medium">Thời gian</p>

        <div className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Từ ngày
            </span>
            <input
              ref={fromDateRef}
              type="date"
              value={filters?.from || ""}
              onChange={(event) =>
                setFilters?.((current) => ({
                  ...current,
                  from: event.target.value,
                }))
              }
              className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Đến ngày
            </span>
            <input
              ref={toDateRef}
              type="date"
              value={filters?.to || ""}
              onChange={(event) =>
                setFilters?.((current) => ({
                  ...current,
                  to: event.target.value,
                }))
              }
              className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
