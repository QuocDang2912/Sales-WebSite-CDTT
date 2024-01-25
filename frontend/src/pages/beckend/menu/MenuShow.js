import { Link, useParams } from "react-router-dom";
import MenuService from "../../../services/MenuService";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
const MenuShow = () => {
  const [brand, setBrand] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const result = await MenuService.show(id);
        setBrand(result.menu);
      } catch (error) {
        console.error("Error fetching brand: ", error);
      }
    };
    fetchBrand();
  }, [id]);

  return (
    <div>
      <section className="hdl-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {/*CONTENT  */}
              <div className="content">
                <section className="content-header my-2">
                  <h1 className="d-inline">Thương hiệu</h1>
                  <hr style={{ border: "none" }} />
                </section>
                <section className="content-body my-6">
                  <div className="row">
                    <div className="col-md-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="text-center" style={{ width: 30 }}>
                              <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th>Tên menu</th>
                            <th>Tên link</th>
                            <th>position</th>
                            <th>ngày tạo</th>
                            <th>ngày cập nhật</th>
                            <th className="text-center" style={{ width: 30 }}>
                              ID
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {brand ? (
                            <tr className="datarow">
                              <td className="text-center">
                                <input type="checkbox" />
                              </td>
                              <td>
                                <div className="name">
                                  <a href="brand_index.html">{brand.name}</a>
                                </div>
                              </td>
                              <td>{brand.link}</td>
                              <td>{brand.position}</td>
                              <td>{brand.created_at}</td>
                              <td>{brand.updated_at}</td>
                              <td className="text-center">{brand.id}</td>
                            </tr>
                          ) : (
                            <p>Loading ...</p>
                          )}
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

export default MenuShow;
