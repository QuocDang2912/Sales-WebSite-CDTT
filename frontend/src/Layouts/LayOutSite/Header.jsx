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
      <div className="icon-container">
        <i className="far fa-user"></i>
        <div className="button-container">
          <Link className="nav-link" to={"/login"} style={{ color: "#006ba1" }}>
            Đăng nhập
          </Link>
          <Link
            className="nav-link"
            to={"/register"}
            style={{ color: "#006ba1" }}
          >
            Đăng ký
          </Link>
        </div>
      </div>
    ) : (
      <>
        {/* First list item */}
        <li
          style={{
            fontSize: "20px",
            width: "140px",
            marginLeft: "30px",
            marginTop: "-20px",
          }}
          className="nav-item"
        >
          <a className="nav-link" href="#">
            {/* Phone icon */}
            <FaPhoneSquare style={{ color: "#006ba1" }} />
            {/* User's phone number */}
            {user.phone}
          </a>
        </li>

        {/* Second list item */}
        <li
          style={{
            fontSize: "20px",
            color: "gray",
            marginLeft: "30px",
            marginTop: "-15px",
          }}
          className="nav-item"
        >
          <a className="nav-link">
            {/* User icon */}
            <FaUser
              style={{ color: "#006ba1" }}
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            {/* User's name */}
            {user.name}

            {/* Dropdown menu for user options */}
            <ul className="dropdown-menu">
              {/* Logout option */}
              <li>
                <a onClick={handleLogout} className="drop-hover">
                  Đăng xuất
                </a>
              </li>
              {/* Profile option */}
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
    <section className="hdl-header1" style={{ backgroundColor: "white" }}>
      <div className="container">
        <div className="row">
          <div className="col-6 col-sm-6 col-md-2 py-1">
            <a href="/">
              <img
                style={{ width: "150px", height: "105px" }}
                src={require("../../assets/logo2.png")}
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
                style={{
                  border: "2px solid #ced4da",
                  outline: "none",
                  marginTop: "20px",
                }}
              />
              <span
                style={{
                  backgroundColor: "#006ba1",
                  color: "white",
                  marginTop: "20px",
                }}
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

          <div className="header-contact d-none d-lg-flex col-lg-3 align-items-center py-2">
            <img
              alt="phone"
              src={require("../../assets/images/phone.png")}
              width="30"
              height="30"
              className="pb-1"
              style={{
                marginTop: "-10px",
                marginLeft: "50px",
              }}
            />
            <div className="contact-info pl-2">
              <h6
                className="mb-1"
                style={{
                  color: "#006ba1",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginTop: "-10px",
                }}
              >
                Liên hệ ngay
              </h6>
              <a
                href="tel:#"
                className="text-dark font1 d-block"
                style={{ fontSize: "18px", width: "150px", fontWeight: "bold" }}
              >
                +84 985 608 759
              </a>
            </div>
            <div className="heart">
              <i className="far fa-heart" aria-hidden="true" />
            </div>
            <div className="call-login--register">
              <ul className="nav nav-fills py-0 my-0">{showUser}</ul>
            </div>
            <Link to={"/cart"}>
              <div className="box-cart float-end ml-2">
                <i
                  style={{ color: "#006ba1" }}
                  className="fa fa-shopping-bag"
                  aria-hidden="true"
                />
                <span>{totalItem}</span>
              </div>
            </Link>
          </div>

          {/* <div className="col-12 col-sm-12 d-none d-md-block col-md-4 text-center py-2">
            <div className="call-login--register">
              <ul className="nav nav-fills py-0 my-0">{showUser}</ul>
            </div>

          </div>
          <div className="col-6 col-sm-6 col-md-1 text-end py-4 py-md-2">
            <Link to={"/cart"}>
              <div
                // style={{ border: "1px solid #0070D2" }}
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
          </div> */}
        </div>
      </div>
    </section>
  );
}
