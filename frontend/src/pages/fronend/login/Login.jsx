import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../../../state/UserSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
const API_URL = "http://localhost:8000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.current);
  const accessToken = useSelector((state) => state.user.accessToken); // Lấy token từ Redux

  useEffect(() => {
    if (currentUser && currentUser.username) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });

      const result = response.data;

      dispatch(setCurrent(result.user));

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem("accessToken", result.access_token); // Lưu accessToken
      localStorage.setItem("user", JSON.stringify(result.user));

      toast.success("Đăng nhập thành công!");

      if (result.user.roles === "customer") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error)
      toast.error(error.response.data.error);
      setMessage(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu."
      );
    }
  };

  useEffect(() => {
    // Thiết lập interceptor request
    const axiosInterceptor = axios.interceptors.request.use(
      (config) => {
        // Thêm token vào header nếu tồn tại
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Xóa interceptor khi component unmount để tránh memory leak
    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
    };
  }, [accessToken]); // Sử dụng accessToken trong dependency array để interceptor được cập nhật khi accessToken thay đổi

  document.title = "Đăng nhập"; 

  return (
    <section
      className="hdl-maincontent py-2"
      style={{ backgroundColor: "white" }}
    >
      <form onSubmit={handleLogin} name="logincustomer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <p>
                Để gửi bình luận, liên hệ hay để mua hàng cần phải có tài khoản.
              </p>
              <p>Đăng nhập tài khoản để trải nghiệm ngay nào!</p>
            </div>
            <div className="col-md-8">
              <div className="mb-3">
                <label htmlFor="username" className="text-main">
                  Tên tài khoản (*)
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                  placeholder="Nhập tài khoản đăng nhập"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="text-main">
                  Mật khẩu (*)
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="mb-3">
                <u>
                  <Link className="nav-link" to={"/userByEmail"} style={{ color: "#006ba1" }}>
                    Quên mật khẩu
                  </Link>
                </u>

              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-main btn-success"
                  name="LOGIN"
                  style={{
                    backgroundColor: "#006ba1",
                    borderColor: "#006ba1",
                    color: "white",
                  }}
                >
                  Đăng nhập
                </button>
              </div>


              <p className={message ? "text-success" : "text-danger"}>
                {message}
              </p>
              <p>
                <u className="text-main">Chú ý</u>: (*) Thông tin bắt buộc phải
                nhập
              </p>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}
