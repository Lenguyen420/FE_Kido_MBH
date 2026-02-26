import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/kido.jpg";
import toast from "react-hot-toast";


const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ===== DỮ LIỆU TEST =====
    const TEST_ID = "test";
    const TEST_PASSWORD = "123";
    const USER_NAME = "Nguyen Van A";

    if (form.id === TEST_ID && form.password === TEST_PASSWORD) {
      localStorage.setItem("user", USER_NAME);
      localStorage.setItem("userId", TEST_ID);
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } else {
      toast.error("Sai ID hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE - LOGO */}
        <div className="flex flex-col items-center justify-center bg-green-700 text-white p-10">

          <img
            src={logo}
            alt="KIDO Logo"
            className="w-56 h-56 object-cover rounded-full shadow-xl border-8 border-white mb-6"
          />

          <h1 className="text-3xl font-bold tracking-wide">
            KIDO Education
          </h1>

        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="flex items-center justify-center p-10">

          <div className="w-full max-w-md">

            <h2 className="text-2xl font-bold text-green-700 mb-8 text-center">
              Đăng nhập
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ID */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  ID
                </label>
                <input
                  type="text"
                  name="id"
                  value={form.id}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Nhập ID"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Nhập mật khẩu"
                />
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Đăng nhập
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;