import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/kido.jpg";
import menuBar from "../../assets/menu_bar.png";
import {
  GraduationCap,
  BookOpen,
  User,
  ChevronDown,
} from "lucide-react";

/* ================== DATA ================== */
const defaultSubjects = {
  "Công dân số": [
    "Kiểm tra giữa kì 1",
    "Kiểm tra học kì 1",
    "Kiểm tra giữa kì 2",
    "Kiểm tra học kì 2",
    "Tất cả các đề",
  ],
  "Stem": [
    "Kiểm tra giữa kì 1",
    "Kiểm tra học kì 1",
    "Kiểm tra giữa kì 2",
    "Kiểm tra học kì 2",
    "Tất cả các đề",
  ],
  "Kỹ năng sống": [
    "Kiểm tra giữa kì 1",
    "Kiểm tra học kì 1",
    "Kiểm tra giữa kì 2",
    "Kiểm tra học kì 2",
    "Tất cả các đề",
  ],
  "ICDL": ["Ôn tập", "Thi thử"],
};

// ====== Tạo lớp 1 → 12 (Giáo dục phổ thông) ======
const grades = {};
for (let i = 1; i <= 12; i++) {
  grades[`Lớp ${i}`] = defaultSubjects;
}

// ====== Tạo Tiếng Anh - Khối 1 → 12 ======
const defaultEnglishExams = [
  "Kiểm tra giữa kì 1",
  "Kiểm tra học kì 1",
  "Kiểm tra giữa kì 2",
  "Kiểm tra học kì 2",
  "Tất cả các đề",
];

const englishGrades = {};
for (let i = 1; i <= 12; i++) {
  englishGrades[`Tiếng Anh - Khối ${i}`] = defaultEnglishExams;
}

const examData = {
  "Giáo dục phổ thông": grades,

  "Ngoại ngữ": {
    "Tiếng Anh": englishGrades,

    IELTS: ["Listening", "Reading", "Writing", "Speaking"],
    TOEIC: ["Part 1", "Part 2", "Part 3", "Part 4"],
  },
};
const Header = () => {
  const location = useLocation();

  const [showExamMenu, setShowExamMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [showMega, setShowMega] = useState(false);

  const [pinned, setPinned] = useState(false);      // giữ mở khi click
  const [selectedGrade, setSelectedGrade] = useState("Lớp 1");
  /* ====== Helpers ====== */
  const generalData = examData["Giáo dục phổ thông"];
  const subjects = generalData[selectedGrade];
  const megaRef = useRef();
  const generalRef = useRef();
  const languageRef = useRef();
  //ngoại ngữ 
  const [showLanguageMega, setShowLanguageMega] = useState(false);
  const [pinnedLanguage, setPinnedLanguage] = useState(false);
  const languageData = examData["Ngoại ngữ"];
  const firstLanguage = Object.keys(languageData)[0];
  const certificates = languageData[firstLanguage];
  const [selectedEnglishGrade, setSelectedEnglishGrade] = useState("Tiếng Anh - Khối 1");

  const englishData = examData["Ngoại ngữ"]["Tiếng Anh"];
  const englishSubjects = englishData[selectedEnglishGrade];

  // đăng nhập 
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [location]);

  // popup menu bar
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        generalRef.current &&
        !generalRef.current.contains(event.target)
      ) {
        setPinned(false);
        setShowMega(false);
      }

      if (
        languageRef.current &&
        !languageRef.current.contains(event.target)
      ) {
        setPinnedLanguage(false);
        setShowLanguageMega(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header className="bg-green-700 text-white relative">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </Link>

        {/* MENU */}
        <nav className="flex items-center gap-6">

          {/* THI */}
          <div
            onClick={() => {
              setActiveMenu("exam");
              setShowExamMenu(!showExamMenu);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition
            ${activeMenu === "exam"
                ? "bg-white text-green-700"
                : "hover:bg-green-600"
              }`}
          >
            <GraduationCap size={18} />
            Thi
          </div>

          {/* CÁ NHÂN */}
          <NavLink
            to="/profile"
            onClick={() => {
              setActiveMenu("profile");
              setShowExamMenu(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
            ${activeMenu === "profile"
                ? "bg-white text-green-700"
                : "hover:bg-green-600"
              }`}
          >
            <User size={18} />
            Cá nhân
          </NavLink>
        </nav>

        {/* LOGIN */}
        <div className="w-80 flex justify-end relative">
          {user ? (
            <div
              ref={userMenuRef}
              className="flex items-center gap-3 text-white font-semibold whitespace-nowrap"
            >
              <span>Xin chào! {user}</span>

              <img
                src={menuBar}
                alt="menu"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-6 h-6 cursor-pointer flex-shrink-0"
              />

              {/* ===== DROPDOWN ===== */}
              {showUserMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl p-4 z-50 text-gray-700">

                  {/* Tên + ID */}
                  <div className="mb-3">
                    <div className="font-semibold text-gray-800">{user}</div>
                    <div className="text-sm text-gray-500">
                      ID: {userId}
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-3">
                    <Link
                      to="/profile-user"
                      className="block cursor-pointer hover:text-green-600"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Thông tin cá nhân
                    </Link>

                    {/* Thông báo */}
                    <Link
                      to="/notifications"
                      className="block hover:text-green-600 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Thông báo
                    </Link>

                    <div
                      onClick={() => {
                        localStorage.removeItem("user");
                        setShowUserMenu(false);
                        window.location.href = "/";
                      }}
                      className="cursor-pointer text-red-500 hover:text-red-600"
                    >
                      Đăng xuất
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>

      {/* ================= SUB HEADER ================= */}
      {showExamMenu && (
        <div className="w-full bg-gray-200 text-gray-700 shadow-sm relative">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-center gap-16 text-sm font-semibold">

            {/* GIÁO DỤC PHỔ THÔNG */}
            <div
              className="relative"
              onMouseEnter={() => !pinned && setShowMega(true)}
              onMouseLeave={() => !pinned && setShowMega(false)}
            >
              <div
                onClick={() => {
                  setPinned(!pinned);
                  setShowMega(true);
                }}
                className={`flex items-center gap-2 cursor-pointer transition
  ${showMega || pinned
                    ? "text-yellow-600"
                    : "hover:text-yellow-600"
                  }`}
              >
                GIÁO DỤC PHỔ THÔNG
                <ChevronDown size={16} />
              </div>

              {/* ===== MEGA MENU ===== */}
              {(showMega || pinned) && (
                <div ref={generalRef} className="absolute left-1/2 -translate-x-1/2 top-10 w-[1000px] bg-white rounded-xl shadow-2xl p-6 z-50">

                  <div className="flex">

                    {/* LEFT - GRADES */}
                    <div className="w-48 border-r pr-4">
                      {Object.keys(generalData).map((grade) => (
                        <div
                          key={grade}
                          onClick={() => setSelectedGrade(grade)}
                          className={`px-4 py-2 rounded-lg cursor-pointer mb-1 transition
        ${selectedGrade === grade
                              ? "bg-yellow-500 text-white"
                              : "hover:bg-gray-100"
                            }`}
                        >
                          {grade}
                        </div>
                      ))}
                    </div>

                    {/* RIGHT - SUBJECTS */}
                    <div className="flex-1 grid grid-cols-2 gap-8 pl-6">
                      {Object.keys(subjects).map((subject) => (
                        <div key={subject}>
                          <div className="bg-gray-200 px-3 py-2 rounded-md font-semibold mb-3">
                            {subject}
                          </div>

                          <ul className="space-y-2 text-sm text-gray-600">
                            {subjects[subject].map((item, i) => (
                              <li
                                key={i}
                                className="hover:text-green-600 cursor-pointer"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* NGOẠI NGỮ */}
            <div
              className="relative"
              onMouseEnter={() => !pinnedLanguage && setShowLanguageMega(true)}
              onMouseLeave={() => !pinnedLanguage && setShowLanguageMega(false)}
            >
              <div
                onClick={() => {
                  setPinnedLanguage(!pinnedLanguage);
                  setShowLanguageMega(true);
                }}
                className={`flex items-center gap-2 cursor-pointer transition font-semibold
    ${showLanguageMega || pinnedLanguage
                    ? "text-yellow-600"
                    : "hover:text-yellow-600"
                  }`}
              >
                NGOẠI NGỮ
                <ChevronDown
                  size={16}
                  className={`${showLanguageMega || pinnedLanguage
                    ? "text-yellow-600"
                    : ""
                    }`}
                />
              </div>

              {(showLanguageMega || pinnedLanguage) && (
                <div
                  ref={languageRef}
                  className="absolute left-1/2 -translate-x-1/2 top-10 w-[1000px] bg-white rounded-xl shadow-2xl p-6 z-50"
                >
                  <div className="flex">

                    {/* LEFT - CHỌN KHỐI */}
                    <div className="w-56 border-r pr-4">
                      {Object.keys(englishData).map((grade) => (
                        <div
                          key={grade}
                          onClick={() => setSelectedEnglishGrade(grade)}
                          className={`px-4 py-2 rounded-lg cursor-pointer mb-1 transition
              ${selectedEnglishGrade === grade
                              ? "bg-yellow-500 text-white"
                              : "hover:bg-gray-100"
                            }`}
                        >
                          {grade}
                        </div>
                      ))}
                    </div>

                    {/* RIGHT - DANH SÁCH ĐỀ */}
                    <div className="flex-1 pl-6">

                      <div className="bg-gray-200 px-3 py-2 rounded-md font-semibold mb-4">
                        {selectedEnglishGrade}
                      </div>

                      <ul className="space-y-3 text-sm text-gray-600">
                        {englishSubjects.map((item, i) => (
                          <li
                            key={i}
                            className="hover:text-green-600 cursor-pointer"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;