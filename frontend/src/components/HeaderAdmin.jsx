import React from "react";
import { useDispatch } from "react-redux";
import { setCurrent } from "../state/UserSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

export default function HeaderAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Access the navigate function for navigation

  // Function to handle logout
  const handleLogout = () => {
    // Dispatch Redux action to clear current user
    dispatch(setCurrent({}));

    // Clear localStorage (remove any stored user data)
    localStorage.clear();

    // Redirect to the admin page after logout
    navigate("/admin");
  };

  return (
    <section className="hdl-header sticky-top">
      <div className="container-fluid">
        <ul className="menutop">
          <li>
            <a href="#st">
              <i className="fa-brands fa-dashcube"></i> Shop Thú cưng PetMart
            </a>
          </li>
          <li className="text-phai">
            <a onClick={handleLogout}>
              <i className="fa-solid fa-power-off"></i> Thoát
            </a>
          </li>
          <li className="text-phai">
            <a href="#st">
              <i className="fa fa-user" aria-hidden="true"></i> Chào quản lý
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
