import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    let buffer = "";
    let timeout;

    const handleKeyDown = (e) => {
      if (e.key >= "0" && e.key <= "9") {
        buffer += e.key;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          buffer = "";
        }, 500);
      }

      if (e.key === "Enter") {
        if (buffer.length > 0) {
          handleScan(buffer);
          buffer = "";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleScan = (cardId) => {
  console.log("📌 Card:", cardId);

  const student = {
    cardId,
    name: "Học sinh",
    balance: 50000,
  };

  // ✅ LƯU VÀO localStorage
  localStorage.setItem("student", JSON.stringify(student));

  // 👉 chuyển trang
  navigate("/order");
};
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl text-center text-white w-[420px]">
        <div className="text-6xl mb-4">🍔</div>
        <h1 className="text-3xl font-bold mb-2">Căn Tin Số</h1>
        <p className="text-white/80">
          Vui lòng quét thẻ học sinh để bắt đầu đặt món
        </p>

        <p className="mt-6 text-sm text-white/60">
          👉 Không cần bấm gì, chỉ cần đưa thẻ vào máy
        </p>
      </div>
    </div>
  );
}