import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-owl-carousel2/lib/styles.css';
import PostServie from '../../../services/PostService';
import { urlImage } from '../../../Api/config';


export default function PostAll() {
    const [PostAll, setPostAll] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        (
            async () => {
                try {
                    const res = await PostServie.postAll(currentPage);
                    console.log("🚀 ~ res:", res)
                    setPostAll(res.posts.data)
                    setCurrentPage(res.posts.current_page);
                    setLastPage(res.posts.last_page);
                    setLoading(false)
                } catch (error) {
                    console.log("🚀 ~ error:", error)

                }


            }
        )()
    }, [currentPage])
    document.title = "Tất cả bài viết";
    return (
        <div>
            <section className="bg-light">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb py-2 my-0">
                            <li className="breadcrumb-item">
                                <a className="text-main" href="index.html">Trang chủ</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Tất cả bài viết
                            </li>
                        </ol>
                    </nav>
                </div>
            </section >
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 order-1 order-md-2">
                            <div className="post-topic mt-3">
                                {
                                    PostAll && PostAll.length > 0 &&
                                    PostAll.map((post) => {
                                        return (
                                            <div className="row post-item mb-4">
                                                <div className="col-4 col-md-4">
                                                    <div className="post-item-image">
                                                        <Link to={`/post_detail/${post.slug}`}>
                                                            <p>
                                                                <img style={{ width: "350px", height: "350px" }} className="img-fluid" src={urlImage + "post/" + post.image} alt='' id="img1" />
                                                            </p>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-8 col-md-8">
                                                    <Link to={`/post_detail/${post.slug}`}>

                                                        <h2 className="post-item-title text-main fs-5 py-1">
                                                            <p>
                                                                {post.title}
                                                            </p>
                                                        </h2>
                                                        <p>{post.description}</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="d-flex justify-content-center">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <a className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&lt; </a>
                                        </li>
                                        {Array.from({ length: lastPage }, (_, i) => (
                                            <li className={`page-item ${i + 1 === currentPage ? 'active' : ''}`} key={i}>
                                                <a className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</a>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                                            <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}> &gt;</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >

    )
}
