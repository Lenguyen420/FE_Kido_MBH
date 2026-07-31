import React, { useState } from "react";

import StockFilterPanel from "./StockFilterPanel";

const defaultFilterValues = {
  postingStatus: "Tất cả",
  documentType: "Tất cả",
  secondaryStatus: "Tất cả",
  reportPeriod: "Đầu năm đến hiện tại",
  fromDate: "01/01/2026",
  toDate: "22/06/2026",
};

export default function StockSidebarFilters({ type }) {
  const [values, setValues] = useState(defaultFilterValues);

  return (
    <StockFilterPanel
      type={type}
      values={values}
      onChange={(field, value) =>
        setValues((current) => ({ ...current, [field]: value }))
      }
      onReset={() => setValues(defaultFilterValues)}
      onApply={() => {}}
      embedded
    />
  );
}
