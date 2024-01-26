import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

import ProductServie from "../../../services/ProductService";
import Loading from "../../../components/Loading";
import { urlImage } from "../../../Api/config";

export default function ProductIndex() {
  const [status1, setStatus1] = useState(0);

  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReLoad] = useState(0);

  useEffect(() => {
    (async () => {

      const result = await ProductServie.index();
      console.log("🚀 ~ file: ProductIndex.jsx:19 ~ result:", result)
      setproducts(result.products);
      setLoading(false);
    })();
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      const updatedProduct = {
        status: status1,
      };
      const result = await ProductServie.delete(updatedProduct, id);
      //   toast("Da xoa vao thung rac");
      setReLoad(reload + 1); // Reload brands
    } catch (error) {
      console.error("Error deleting brand: ", error);
    }
  };

  const handleStatus = (id) => {
    (async () => {
      const result = await ProductServie.status(id);
      setReLoad(Date.now);
    })();
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Sản phẩm</h1>
        <Link className="btn btn-primary btn-sm" to={"/admin/product/create"} style={{ color: "white" }}>
          {" "}
          them moi
        </Link>
        <div className="row mt-3 align-items-center">
          <div className="col-6">
            <ul className="manager">
              <li>
                <a href="product_index.html">Tất cả (123)</a>
              </li>
              <li>
                <a href="#">Xuất bản (12)</a>
              </li>
              <li>
                <Link to="/admin/product/trash">
                  {" "}
                  Thùng Rác <FaTrash />
                </Link>
              </li>
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
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    »
                  </a>
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
              <th className="text-center" style={{ width: 130 }}>
                Hình ảnh
              </th>
              <th>Tên sản phẩm</th>
              <th>giá</th>
              <th>category</th>
              <th>brand</th>
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
                      <img className="img-fluid" src={urlImage + "product/" + product.image} alt={product.image} />
                    </td>
                    <td>
                      <div className="name">
                        <a href="product_edit.html">{product.name}</a>
                      </div>
                      <div className="function_style">
                        <button
                          onClick={() => handleStatus(product.id)}
                          className={product.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"}
                        >
                          {product.status === 1 ? <FaToggleOn /> : <FaToggleOn />}
                        </button>
                        <Link to={"/admin/product/edit/" + product.id} className="px-1 text-primary">
                          <FaEdit />
                        </Link>
                        <Link to={"/admin/product/show/" + product.id} className="px-1 text-info">
                          <FaEye />
                        </Link>
                        <button onClick={() => handleDelete(product.id)} className="px-1 text-danger">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.category_id}</td>
                    <td>{product.brand_id}</td>
                    <td className="text-center" style={{ width: 30 }}>
                      {product.id}
                    </td>
                  </tr>
                );
              })}
            {loading ? <Loading /> : ""}
          </tbody>
        </table>
      </section>
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
      {/* Same as */}
      <ToastContainer />
    </div>

  );
};
