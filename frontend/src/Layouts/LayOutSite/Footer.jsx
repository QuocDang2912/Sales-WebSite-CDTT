import React, { useEffect, useState } from "react";
import PageService from "../../services/PageService";
import { Link } from "react-router-dom";

export default function Footer() {
  const [Page, setPage] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await PageService.index();
        setPage(res.pages);
      } catch (error) {
        console.log("🚀 ~ fetch ~ error:", error)

      }

    };
    fetch();
  }, []);

  return (
    <>
      <div>
        <section className="hdl-footer pb-4">
          <div className="container">
            <div className="row">
              <div className="col-md-4 pt-4">
                <h3 className="widgettilte">CHÚNG TÔI LÀ AI?</h3>
                <p className="pt-1">
                  Copyright@ 2024 Pet Mart là hệ thống bán sỉ và lẻ các giống
                  thú cưng, phụ kiện và cung cấp dịch vụ chăm sóc thú cưng, mong muốn đem đến chất lượng tốt nhất cho
                  khách hàng.
                </p>
                <p className="pt-1">
                  Địa chỉ: 78 đường số 2, Tăng Nhơn Phú B, Quận 9 , Thành Phố Hồ Chí Minh
                </p>
                <p className="pt-1">
                  Điện thoại: 0985 608 759(call, zalo) - Email:
                  petmartshop@gmail.com
                </p>
                <h3 className="widgettilte">MẠNG XÃ HỘI</h3>
                <div className="social my-3">
                  <div className="facebook-icon">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </div>
                  <div className="instagram-icon">
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                  </div>
                  <div className="google-icon">
                    <a href="#">
                      <i className="fab fa-google" />
                    </a>
                  </div>
                  <div className="youtube-icon">
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 pt-4">
                <h3 className="widgettilte">
                  <strong>Liên hệ</strong>
                </h3>
                <ul className="footer-menu">
                  <li>
                    <Link to='/'>
                      Trang chủ
                    </Link>
                    {/* <a href="index.html"></a> */}
                  </li>

                  <li>
                    <a href="/productall">Sản phẩm</a>
                  </li>
                  <li>
                    <a href="/postall">Bài viết</a>
                  </li>
                  <li>
                    <Link to='/contact'>
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 pt-4">
                <h3 className="widgettilte">
                  <strong>Trang đơn </strong>
                </h3>
                <ul className="footer-menu">
                  {Page &&
                    Page.length > 0 &&
                    Page.map((item) => {
                      return (
                        <li>
                          <Link to={`/post_page/${item.slug}`}>
                            {item.title}
                          </Link>
                          {/* <a href="index.html"></a> */}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="dhl-copyright bg-dark py-3">
          <div className="container text-center text-white">
            Thiết kế bởi: Anh Quốc - Bích Ngọc
          </div>
        </section>
      </div>
    </>
  );
}
