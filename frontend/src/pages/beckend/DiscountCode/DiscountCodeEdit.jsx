import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaEdit,
  FaEye,
  FaToggleOff,
  FaToggleOn,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DiscountcodeService from "../../../services/DiscountcodeService";
import Loading from "../../../components/Loading";

export default function DiscountCodeEdit() {
  const [reload, setReLoad] = useState(0);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expires_bd, setExpibd] = useState([]);
  const [expires_kt, setExpikt] = useState([]);
  const [status, setStatus] = useState(1);
  const [type, setType] = useState(0);
  const [code, setCode] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await DiscountcodeService.show(id);
      console.log("🚀 ~ file: BrandEdit.jsx:16 ~ fetch ~ response:", response);
      const Discountcode = response.Discountcode;

      setName(Discountcode.percentage);
      setTitle(Discountcode.title);
      setDescription(Discountcode.description);
      setExpibd(Discountcode.expires_bd);
      setExpikt(Discountcode.expires_kt);
      setStatus(Discountcode.status);
      setType(Discountcode.type);
      setCode(Discountcode.code);
    };
    fetch();
  }, [id]);

  //hàm thêm

  const handleSubmit = (e) => {
    e.preventDefault();
    const brand = new FormData();
    brand.append("percentage", name);
    brand.append("title", title);
    brand.append("type", type);
    brand.append("description", description);
    brand.append("expires_bd", expires_bd);
    brand.append("expires_kt", expires_kt);
    brand.append("status", status);
    brand.append("code", code);

    (async () => {
      const result = await DiscountcodeService.update(brand, id);
      toast(result.message);
      console.log("ssss", result);
      setReLoad(result.Discountcode.id);
      navigate("/admin/discountcode/index", { replace: true });
    })();
  };

  return (
    <div>
      <section className="hdl-content">
        <div className="container-fluid">
          <div className="row">
            <ToastContainer />
            <div className="col-md-12">
              {/*CONTENT  */}
              <div className="content">
                <section className="content-header my-2">
                  <h1 className="d-inline">cập nhập giảm giá</h1>
                  <hr style={{ border: "none" }} />
                </section>
                <section className="content-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>
                        <strong>Tên mã giảm giá(*)</strong>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder="Tên mã giảm giá"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>
                        <strong>Loại mã giảm giá</strong>
                      </label>
                      <select
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                        className="form-control"
                      >
                        <option value={0}>Chọn loại giảm giá</option>
                        <option value={1}>Giam giá theo %</option>
                        <option value={2}>Giam giá theo tiền</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>
                        <strong>Percentage(*)</strong>
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Phần trăm giảm giá"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label>
                        <strong>Mô tả</strong>
                      </label>
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        rows="4"
                        placeholder="mô tả"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label>
                        <strong>Ngày bắt đầu</strong>
                      </label>
                      <input
                        type="datetime-local"
                        onChange={(e) => setExpibd(e.target.value)}
                        value={expires_bd}
                      />
                    </div>

                    <div className="mb-3">
                      <label>
                        <strong>Ngày kết thúc</strong>
                      </label>
                      <input
                        type="datetime-local"
                        onChange={(e) => setExpikt(e.target.value)}
                        value={expires_kt}
                      />
                    </div>
                    <div className="mb-3">
                      <label>
                        <strong>Trạng thái</strong>
                      </label>
                      <select
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                        className="form-control"
                      >
                        <option value={1}>Xuất bản</option>
                        <option value={2}>Chưa xuất bản</option>
                      </select>
                    </div>
                    <div className="mb-3 text-end">
                      <button
                        type="submit"
                        className="btn btn-success"
                        name="THEM"
                      >
                        <i className="fa fa-save" /> Lưu[Thêm]
                      </button>
                    </div>
                  </form>
                </section>
              </div>
              {/*END CONTENT*/}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
