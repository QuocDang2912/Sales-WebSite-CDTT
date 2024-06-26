import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  let user = useSelector((state) => state.user.current);
  console.log("🚀 ~ profile ~ user:", user);

  document.title = "Thông tin tài khoản";

  return (
    <div>
      <section className="bg-light">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb py-2 my-0">
              <li className="breadcrumb-item">
                <a className="text-main" href="index.html">
                  Trang chủ
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Thông tin tài khoản
              </li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="hdl-maincontent py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-3 order-2 order-md-1">
              <ul className="list-group mb-3 list-category">
                <li
                  style={{ backgroundColor: "#A9D0E8" }}
                  className="list-group-item bg-main py-3"
                >
                  Thông tin tài khoản
                </li>
                <li className="list-group-item">
                  <Link to={"/profile"}>Quản lý thông tin</Link>
                </li>
                <li className="list-group-item">
                  <Link to={"/quanly_order"}>Quản lý đơn hàng</Link>
                </li>
                <li className="list-group-item">
                  <Link to={"/changePass"} style={{ color: "#006BA1" }}>
                    Đổi mật khẩu
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-9 order-1 order-md-2">
              <h1 className="fs-2 text-main">Thông tin tài khoản</h1>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td style={{ width: "20%" }}>Tên tài khoản</td>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>Tên đăng nhập</td>
                    <td>
                      {user.username} <Link to="/ChangePass">Đổi mật khẩu</Link>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>Email</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "20%" }}>Điện thoại</td>
                    <td>{user.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
