import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";



import ProductServie from "../../../services/ProductService";
import Loading from "../../../components/Loading";
import { urlImage } from "../../../Api/config";

export default function ProductIndex() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {

      const result = await ProductServie.index();
      console.log("🚀 ~ file: ProductIndex.jsx:19 ~ result:", result)
      setproducts(result.products);
      setLoading(false);
    })();
  }, []);


  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Sản phẩm</h1>
        <a href="product_create.html" className="btn-add">Thêm mới</a>
        <div className="row mt-3 align-items-center">
          <div className="col-6">
            <ul className="manager">
              <li><a href="product_index.html">Tất cả (123)</a></li>
              <li><a href="#">Xuất bản (12)</a></li>
              <li><a href="product_trash.html">Rác (12)</a></li>
            </ul>
          </div>
          <div className="col-6 text-end">
            <input type="text" className="search d-inline" />
            <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>
        <div className="row mt-1 align-items-center">
          <div className="col-md-8">
            <select name className="d-inline me-1">
              <option value>Hành động</option>
              <option value>Bỏ vào thùng rác</option>
            </select>
            <button className="btnapply">Áp dụng</button>
            <select name className="d-inline me-1">
              <option value>Tất cả danh mục</option>
            </select>
            <select name className="d-inline me-1">
              <option value>Tất cả thương hiệu</option>
            </select>
            <button className="btnfilter">Lọc</button>
          </div>
          <div className="col-md-4 text-end">
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-sm justify-content-end">
                <li className="page-item disabled">
                  <a className="page-link">«</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">»</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
      <section className="content-body my-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" style={{ width: 30 }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th className="text-center" style={{ width: 130 }}>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>giá</th>
              <th>category_id</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => {
                return (
                  <tr className="datarow" key={index}>
                    <td>
                      <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                      <img className="img-fluid" src={urlImage + "brand/" + product.image} alt={product.image} />
                    </td>
                    <td>
                      <div className="name">
                        <a href="product_edit.html">
                          {product.name}
                        </a>
                      </div>
                      <div className="function_style">
                        <a href="#" className="px-1 text-success">
                          <i className="fa fa-toggle-on" />
                        </a>
                        <a href="product_edit.html" className="px-1 text-primary">
                          <i className="fa fa-edit" />
                        </a>
                        <a href="product_show.html" className="px-1 text-info">
                          <i className="fa fa-eye" />
                        </a>
                        <a href="#" className="px-1 text-danger">
                          <i className="fa fa-trash" />
                        </a>
                      </div>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.category_id}</td>
                    <td className="text-center" style={{ width: 30 }}>{product.id}</td>
                  </tr>
                )
              })
            }
            {loading ? <Loading /> : ""}
          </tbody>
        </table>
      </section>
    </div>

  );
};
