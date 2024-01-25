import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MenuService from "../../../services/MenuService";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const MenuEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [parentid, setParentId] = useState("");
  const [sortorder, setSortOrder] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [menus, setMenus] = useState([]);
  const [reload, setReLoad] = useState(0);
  //listmenu
  useEffect(() => {
    (async () => {
      const result = await MenuService.index();
      setMenus(result.menu);
      setReLoad(false);
    })();
  }, [reload]);
  //store
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBrand = new FormData();

    // Add other form data fields
    updatedBrand.append("name", name);
    updatedBrand.append("link", link);
    updatedBrand.append("position", position);
    updatedBrand.append("parent_id", parentid);
    updatedBrand.append("sort_order", sortorder);
    updatedBrand.append("status", status);

    try {
      console.log("aaaaa", updatedBrand);
      const result = await MenuService.update(updatedBrand, id);
      toast("Cập nhật thành công");
      // You may choose to redirect to the brand index page or perform other actions after successful update
    } catch (error) {
      console.error("Error updating brand:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  //
  useEffect(() => {
    (async function () {
      const result = await MenuService.show(id);
      const item = result.menu;
      setName(item.name);
      setLink(item.link);
      setParentId(item.parent_id);
      setPosition(item.position);
      setSortOrder(item.sort_order);
      setStatus(item.status);
      console.log(result.menu);
    })();
  }, [id]);
  //
  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Cập nhật menu</h1>
          <div className="text-end">
            <Link to="/admin/menu" className="btn btn-sm btn-info mx-1">
              <FaArrowLeft />
              Về danh sách
            </Link>
          </div>
        </section>
        <section className="content-body my-2">
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label>
                  <strong>Tên menu</strong>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Liên kết</strong>
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label for="position">
                  <strong>Vị trí</strong>
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="form-select"
                >
                  <option value="mainmenu">Main Menu</option>
                  <option value="footermenu">Footer Menu</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Đăng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <p>Chọn trạng thái đăng</p>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="1">Xuất bản</option>
                    <option value="2">Chưa xuất bản</option>
                  </select>
                </div>
                <div className="box-footer text-end px-2 py-3">
                  <button type="submit" className="btn btn-sm btn-success">
                    <FaSave />
                    Lưu [Cập nhật]
                  </button>
                </div>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Cấp cha</strong>
                </div>
                <select
                  value={parentid}
                  onChange={(e) => setParentId(e.target.value)}
                  className="form-select"
                >
                  {menus &&
                    menus.map((menus, index) => {
                      return <option value={menus.id}>{menus.name}</option>;
                    })}
                </select>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Thứ tự</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select
                    value={sortorder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Sau</option>
                    <option value="2">sau</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </form>
  );
};
export default MenuEdit;
