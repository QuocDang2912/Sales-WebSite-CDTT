import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaSearch, FaPhoneSquare, FaUser } from "react-icons/fa";
import { setCurrent } from "../../state/UserSlice";

export default function Header() {
  // search
  const [search, setSearch] = useState([]);
  const handleSearch = () => {
    // Chuyển trang và truyền search query
    window.location.href = `/product_search/${encodeURIComponent(search)}`;
  };
  // search

  // REDUX
  const dispatch = useDispatch();

  let cartItem = useSelector((state) => state.cart.items);
  const totalItem = cartItem.reduce((total, item) => {
    // tổng item
    return total + item.count;
  }, 0);

  let user = useSelector((state) => state.user.current);


  // REDUX

  // logout
  const handleLogout = () => {
    dispatch(setCurrent({}));
    localStorage.clear();
  };
  let showUser =
    JSON.stringify(user) == "{}" ? (
      <>
        <li className="nav-item" style={{ fontSize: "20px" }}>
          <Link className="nav-link" to={"/login"}>
            Đăng nhập
          </Link>
          {/* <a className="nav-link" href="login.html">Đăng nhập</a> */}
        </li>
        <li className="nav-item" style={{ fontSize: "20px" }}>
          <Link className="nav-link" to={"/register"}>
            Đăng Ký
          </Link>
        </li>
      </>
    ) : (
      <>
        <li style={{ fontSize: "20px" }} className="nav-item">
          <a className="nav-link" href="login.html">
            <FaPhoneSquare style={{ color: "#0070D2" }} />
            {user.phone}
          </a>
        </li>
        <li style={{ fontSize: "20px", color: "gray" }} className="nav-item">
          <a className="nav-link">
            <FaUser
              style={{ color: "#0070D2" }}
              className=" dropdown-toggle "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            {user.name}

            <ul className="dropdown-menu">
              <li>
                <a onClick={handleLogout} className="drop-hover">
                  Đăng xuất
                </a>
              </li>
              <li>
                <Link to={`/profile`} className="dropdown-item drop-hover">
                  Thông Tin
                </Link>
              </li>
            </ul>
          </a>
        </li>
      </>
    );

  return (
    <section className="hdl-header1">
      <div className="container">
        <div className="row">
          <div className="col-6 col-sm-6 col-md-2 py-1">
            <a href="index.html">
              <img
                style={{ width: "200px", height: "120px" }}
                src={require("../../assets/images.jpg")}
                className="img-fluid"
                alt="Logo"
              />
            </a>
          </div>
          <div className="col-12 col-sm-9 d-none d-md-block col-md-5 py-3">
            <div className="input-group mb-3">
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                className="form-control"
                placeholder="Nhập nội dung tìm kiếm"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                style={{ border: "2px solid #ced4da", outline: "none" }}
              />
              <span
                style={{ backgroundColor: "#0070D2", color: "white" }}
                className="input-group-text bg-main"
                id="basic-addon2"
              >
                <FaSearch
                  onClick={handleSearch}
                  style={{ marginLeft: "3px" }}
                />
                Search
              </span>
            </div>
          </div>
          <div className="col-12 col-sm-12 d-none d-md-block col-md-4 text-center py-2">
            <div className="call-login--register border-bottom">
              <ul className="nav nav-fills py-0 my-0">{showUser}</ul>
            </div>

            <div className="fs-6 py-2">
              Đổi trả hoặc hoàn tiền{" "}
              <span style={{ color: "#0070D2" }} className="text-main">
                TRONG 3 NGÀY
              </span>
            </div>
          </div>
          <div className="col-6 col-sm-6 col-md-1 text-end py-4 py-md-2">
            <Link to={"/cart"}>
              <div
                style={{ border: "1px solid #0070D2" }}
                className="box-cart float-end"
              >
                <i
                  style={{ color: "#0070D2" }}
                  className="fa fa-shopping-bag"
                  aria-hidden="true"
                />
                <span>{totalItem}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
