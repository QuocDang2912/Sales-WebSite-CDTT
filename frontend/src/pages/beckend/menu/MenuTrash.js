import MenuService from "../../../services/MenuService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaUndo } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RiArrowGoBackFill, RiDeleteBin5Fill } from "react-icons/ri";
import Loading from "../../../components/Loading";
const MenuTrash = () => {
  const [brands, setBrands] = useState([]);
  const [load, setLoad] = useState(true);
  const [reload, setReLoad] = useState(0);

  const [status1, setStatus1] = useState(1);
  useEffect(() => {
    (async () => {
      setLoad(false);
      const result = await MenuService.thungrac();
      setBrands(result.menu);
      setLoad(false);
    })();
  }, [reload]);

  //hàm thêm

  //kp
  const handleKp = async (id) => {
    try {
      const updatedBrand = {
        status: status1,
      };
      const result = await MenuService.delete(updatedBrand, id);
      setReLoad(reload + 1); // Reload brands
      toast("Khoi phuc thanh cong");
    } catch (error) {
      console.error("Error deleting brand: ", error);
    }
  };
  //
  const handDelete = (id) => {
    (async () => {
      // const data = await BrandService.destroy(id);
      const result = await MenuService.destroy(id);
      setReLoad(result.menu.id);
    })();
  };

  return (
    <div>
      <section className="hdl-content">
        <div className="container-fluid">
          <div className="row">
            <ToastContainer />
            <div className="col-md-8">
              {/*CONTENT  */}
              <div className="content">
                <section className="content-header my-2">
                  <h1 className="d-inline">Thương hiệu</h1>
                  <hr style={{ border: "none" }} />
                </section>
                <section className="content-body my-5">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row mt-3 align-items-center">
                        <div className="col-12">
                          <ul className="manager">
                            <li>
                              <a href="brand_index.html">Tất cả (123)</a>
                            </li>
                            <li>
                              <a href="#">Xuất bản (12)</a>
                            </li>
                            <li>
                              <a href="brand_trash.html">Rác (12)</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row my-2 align-items-center">
                        <div className="col-md-6">
                          <select name className="d-inline me-1">
                            <option value>Hành động</option>
                            <option value>Bỏ vào thùng rác</option>
                          </select>
                          <button className="btnapply">Áp dụng</button>
                        </div>
                        <div className="col-md-6 text-end">
                          <input type="text" className="search d-inline" />
                          <button className="btnsearch d-inline">
                            Tìm kiếm
                          </button>
                        </div>
                      </div>
                      {load ? <Loading /> : ""}
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="text-center" style={{ width: 30 }}>
                              <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th>Tên Menu</th>
                            <th>Tên link</th>
                            <th>Vi trí</th>
                            <th className="text-center" style={{ width: 30 }}>
                              ID
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {brands &&
                            brands.map((brand, index) => {
                              return (
                                <tr className="datarow" key={index}>
                                  <td className="text-center">
                                    <input type="checkbox" />
                                  </td>
                                  <td>
                                    <div className="name">
                                      <a href="brand_index.html">
                                        {brand.name}
                                      </a>
                                    </div>
                                    <div className="function_style">
                                      <Link
                                        href="#"
                                        onClick={() => handleKp(brand.id)}
                                        className="px-1 text-success"
                                      >
                                        <RiArrowGoBackFill />
                                      </Link>
                                      <Link
                                        to={``}
                                        onClick={() => handDelete(brand.id)}
                                        className="px-1 text-danger"
                                      >
                                        <RiDeleteBin5Fill />
                                      </Link>
                                    </div>
                                  </td>
                                  <td>{brand.link}</td>
                                  <td>{brand.position}</td>
                                  <td className="text-center">{brand.id}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
              {/*END CONTENT*/}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuTrash;
