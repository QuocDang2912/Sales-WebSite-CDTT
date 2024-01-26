import React, { useEffect, useState } from 'react'
import TopicServie from '../../../services/TopicService';
import Loading from '../../../components/Loading';
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaEye, FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
export default function TopicIndex() {

  const [status1, setStatus1] = useState(0);

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReLoad] = useState(0);


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sort_order, setSortOrder] = useState(1);
  const [status, setStatus] = useState(1);


  useEffect(() => {
    (async () => {

      const result = await TopicServie.index();
      console.log("🚀 ~ file: TopicIndex.jsx:26 ~ result:", result)
      setTopics(result.topics);
      setLoading(false);
    })();
  }, [reload]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const topic = new FormData();
    topic.append("name", name);
    topic.append("description", description);
    topic.append("sort_order", sort_order);
    topic.append("status", status);

    (async () => {
      const result = await TopicServie.store(topic);
      console.log("🚀 ~ file: TopicIndex.js:42 ~ result:", result)
      alert(result.message);
      // Reset form fields
      setName("");
      setDescription("");
      setSortOrder(1);
      setStatus(1);
      document.getElementById('idreset').reset();
      setReLoad(result.topic.id);
    })();
  };
  const handleDelete = async (id) => {
    try {
      const updatedTopic = {
        status: status1,
      };
      const result = await TopicServie.delete(updatedTopic, id);
      //   toast("Da xoa vao thung rac");
      setReLoad(reload + 1); // Reload brands
    } catch (error) {
      console.error("Error deleting brand: ", error);
    }
  };
  const handleStatus = (id) => {
    (async () => {
      const result = await TopicServie.status(id);
      setReLoad(Date.now);
    })();
  };


  return (
    <div>
      <div className="content">
        <section className="content-header my-2">
          <h1 className="d-inline">Chủ đề bài viết</h1>
          <hr style={{ border: "none" }} />
        </section>
        <section className="content-body my-2">
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={handleSubmit} id="idreset" encType="multipart/form-data">
                <div className="mb-3">
                  <label>
                    <strong>Tên chủ đề (*)</strong>
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Nhập tên danh mục"
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
                    <strong>sort_order</strong>
                  </label>
                  <select onChange={(e) => setSortOrder(e.target.value)} value={sort_order} className="form-select">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>
                    <strong>Trạng thái</strong>
                  </label>
                  <select onChange={(e) => setStatus(e.target.value)} value={status} className="form-control">
                    <option value={1}>Xuất bản</option>
                    <option value={2}>Chưa xuất bản</option>
                  </select>
                </div>
                <div className="mb-3 text-end">
                  <button type="submit" className="btn btn-success" name="THEM">
                    <i className="fa fa-save" /> Lưu[Thêm]
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-8">
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
                      {" "}
                      <Link to="/admin/topic/trash">
                        {" "}
                        Thùng Rác <FaTrash />
                      </Link>
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
                  <button className="d-inline">Tìm kiếm</button>
                </div>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: 30 }}>
                      <input type="checkbox" id="checkboxAll" />
                    </th>
                    <th>Tên chủ đề</th>
                    <th>Tên slug</th>
                    <th className="text-center" style={{ width: 30 }}>
                      ID
                    </th>
                    <th className="text-center" style={{ width: 30 }}>
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topics &&
                    topics.map((topic, index) => {
                      return (
                        <tr className="datarow" key={index}>
                          <td className="text-center">
                            <input type="checkbox" />
                          </td>
                          <td>
                            <a href="brand_index.html">{topic.name}</a>
                          </td>
                          <td>
                            <div className="name">
                              <a href="brand_index.html">{topic.slug}</a>
                            </div>
                            <div className="function_style">
                              <a href="#" className="px-1 text-success">
                                <i className="fa fa-toggle-on" />
                              </a>
                              <a href="topic_edit.html" className="px-1 text-primary">
                                <i className="fa fa-edit" />
                              </a>
                              <a href="topic_show.html" className="px-1 text-info">
                                <i className="fa fa-eye" />
                              </a>
                              <a href="#" className="px-1 text-danger">
                                <i className="fa fa-trash" />
                              </a>
                            </div>
                          </td>

                          <td className="text-center">{topic.id}</td>
                          <td className="text-center">
                            <MdDeleteForever
                              onClick={() => handleDelete(topic.id)}
                              style={{ color: "red", fontSize: "20" }}
                            />

                            <Link to={`/admin/topic/edit/${topic.id}`}>
                              <FaEdit style={{ color: "blue", fontSize: "20" }} />
                            </Link>
                            <Link to={`/admin/topic/show/${topic.id}`} className="px-1 text-info">
                              <FaEye />
                            </Link>
                            <button
                              onClick={() => handleStatus(topic.id)}
                              className={
                                topic.status === 1 ? "border-0 px-1 text-success" : "border-0 px-1 text-danger"
                              }
                            >
                              {topic.status === 1 ? <FaToggleOn /> : <FaToggleOn />}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  {loading ? <Loading /> : ""}
                </tbody>
              </table>
            </div>
          </div>
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
    </div>
  )
}
