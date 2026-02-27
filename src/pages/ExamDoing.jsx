import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import mockExamData from "../datas/mockExamData";

const ExamDoing = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

   

  /* ================= TIMER ================= */
  const totalTime = mockExamData.duration * 60;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const timeProgress = (timeLeft / totalTime) * 100;

  /* ================= HANDLE ANSWER ================= */
  const handleSelect = (questionId, label) => {
  setAnswers({
    ...answers,
    [questionId]: label,
  });
};

  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* ================= HEADER ================= */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">

  {/* MOBILE */}
  <div className="flex items-center gap-4 text-sm font-medium md:hidden">
    <span className="border-b-2 border-green-600 pb-1">
      Tất cả ({mockExamData.questions.length})
    </span>

    <span className="flex items-center gap-1 text-gray-500">
      ○ Chưa làm (10)
    </span>

    <span className="flex items-center gap-1 text-gray-500">
      ● Kiểm tra lại (0)
    </span>
  </div>

  {/* DESKTOP */}
  <div className="hidden md:flex items-center justify-between">
    <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
      <ArrowLeft size={18} />
    </button>

    <div className="flex gap-8 text-sm font-medium">
      <span className="border-b-2 border-green-600 pb-1">
        Tất cả ({mockExamData.questions.length})
      </span>
      <span className="text-gray-500">○ Chưa làm</span>
      <span className="text-gray-500">● Kiểm tra lại</span>
    </div>

    <div />
  </div>

</div>

      {/* ================= BODY ================= */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

        {/* ================= LEFT ================= */}
        <div className="flex-1 overflow-y-auto flex justify-center p-6">

  <div className="w-full max-w-3xl space-y-8">

    {mockExamData.questions.map((question, index) => (

      <div
        key={question.id}
        className="bg-white p-8 rounded-xl border-gray-200  border shadow-sm"
      >

        <div className="flex items-center gap-3 mb-4">
          <span className="px-4 py-1 bg-gray-100 rounded-full text-sm">
            Câu {question.id}
          </span>
          <span className="text-gray-600">
            {question.instruction}
          </span>
        </div>

        <p className="mb-4 font-medium">
          {question.questionText}
        </p>

        {question.image && (
          <img
            src={question.image}
            alt=""
            className="rounded-lg mb-4 max-w-md border-gray-200 border"
          />
        )}

        {question.options.map((opt) => (
          <div
            key={opt.label}
            onClick={() => handleSelect(question.id, opt.label)}
            className={`
              border rounded-xl border-gray-200  p-4 mb-3 cursor-pointer transition
              ${
                answers[question.id] === opt.label
                  ? "border-green-600 bg-green-50"
                  : "hover:bg-gray-50"
              }
            `}
          >
            <strong>{opt.label}.</strong> {opt.text}
          </div>
        ))}

      </div>

    ))}

  </div>
</div>

       {/* ================= RIGHT ================= */}
<div
  className="
    w-full 
    md:w-80 
    bg-white 
    border-t 
    md:border-t-0 
    md:border-l 
    border-gray-200 
    flex flex-col 
    md:h-full
  "
>
  {/* ===== TOP CONTENT ===== */}
  <div className="p-3 md:p-5 md:flex-1">
    <p className="text-xs md:text-sm text-gray-500 mb-1">
      BÀI THI
    </p>

    <h2 className="font-semibold mb-3 text-base md:text-lg">
      {mockExamData.title}
    </h2>

    <div className="mb-2 text-xs md:text-sm">
      {Object.keys(answers).length}/
      {mockExamData.questions.length} câu
    </div>

    {/* Progress */}
    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div
        className="bg-green-600 h-2 rounded-full transition-all duration-1000"
        style={{ width: `${timeProgress}%` }}
      />
    </div>

    {/* Timer */}
    <div className="text-center mb-3">
      <span className="bg-green-600 text-white px-3 py-0.5 rounded-full text-xs">
        {formattedTime}
      </span>
    </div>

    {/* QUESTION NAVIGATOR - Desktop Only */}
    <div className="hidden md:grid grid-cols-5 gap-1">
      {mockExamData.questions.map((q, index) => {
        const isAnswered = answers[q.id];

        return (
          <button
            key={q.id}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`
              w-8 h-8 text-xs rounded border border-gray-300 transition
              ${
                isAnswered
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-100"
              }
            `}
          >
            {q.id}
          </button>
        );
      })}
    </div>
  </div>

  {/* ===== BOTTOM BUTTONS ===== */}
  <div className="p-3 md:p-5 flex justify-between items-center mb-15">
    <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition text-sm">
      ✕ Thoát
    </button>

    <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition">
      NỘP BÀI
    </button>
  </div>
</div>
      </div>
    </div>
  );
};

export default ExamDoing;