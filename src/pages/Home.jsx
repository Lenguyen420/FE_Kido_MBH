import React from "react";
import testImg from "../assets/test.jpg";
import { useNavigate } from "react-router-dom";
const data = [
  {
    title:
      "Trọn bộ đề thi Tiếng Anh lớp 1 sách Explore Our World (có đáp án)",
    count: 23,
  },
  {
    title:
      "Trọn bộ đề thi Tiếng Anh lớp 1 sách Macmillan Next Move (có đáp án)",
    count: 28,
  },
  {
    title:
      "Trọn bộ đề thi Tiếng Anh lớp 1 sách Family and Friends (có đáp án)",
    count: 32,
  },
  {
    title:
      "Trọn bộ đề thi Tiếng Anh lớp 1 sách i-Learn Smart Start (có đáp án)",
    count: 34,
  },
  {
    title:
      "Trọn bộ đề thi Tiếng Anh lớp 1 sách Global Success (có đáp án)",
    count: 44,
  },
  {
    title:
      "Trọn bộ đề thi Tiếng Việt lớp 1 sách Kết nối tri thức với cuộc sống (có đáp án)",
    count: 108,
  },
  {
    title:
      "Trọn bộ đề thi Tiếng Việt lớp 1 sách Chân trời sáng tạo (có đáp án)",
    count: 150,
  },
  {
    title:
      "Trọn bộ đề thi Tiếng Việt lớp 1 sách Cánh Diều (có đáp án)",
    count: 108,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen py-6">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          {/* Left */}
          <div className="flex items-center gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              Lớp 1
            </h2>
            <div className="hidden sm:block h-1 w-12 bg-gray-200 rounded-full"></div>
          </div>           
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

          {data.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate("/exam-list")}
className="flex flex-col sm:flex-row gap-4 p-4 
border border-gray-200 
rounded-lg 
hover:shadow-sm 
transition 
bg-white cursor-pointer"            >
              {/* IMAGE */}
              <img
                src={testImg}
                alt="test"
                className="w-full sm:w-32 h-40 sm:h-20 object-cover rounded-lg"
              />

              {/* CONTENT */}
              <div className="flex flex-col justify-between flex-1">
                <h3 className="text-sm sm:text-base font-medium text-gray-800 leading-snug">
                  {item.title}
                </h3>

                <span className="inline-block mt-3 text-xs bg-gray-200 px-3 py-1 rounded-full w-fit">
                  {item.count} đề
                </span>
              </div>
            </div>
          ))}

        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;