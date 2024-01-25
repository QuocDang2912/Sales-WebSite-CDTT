
import React, { useEffect, useState } from 'react'
import PostServie from '../../../services/PostService'
import { Link, useParams } from 'react-router-dom'
import { urlImage } from '../../../Api/config'
import Loading from '../../../components/Loading'
import PageService from '../../../services/PageService'
export default function PostPage() {
    const [page, setPage] = useState([])
    const [pageAll, setPageAll] = useState([])
    const [loading, setLoading] = useState(true)

    const { slug } = useParams()
    useEffect(() => {

        const fetch = async () => {
            const res = await PageService.PostPage(slug)
            console.log("🚀 ~ fetch ~ res:", res)
            setPage(res.page)

            const PageAll = await PageService.index()
            console.log("🚀 ~ fetch ~ PageAll:", PageAll)
            setPageAll(PageAll.pages)

            setLoading(false)
        }
        fetch()

    }, [slug])
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
                                Trang đơn
                            </li>
                        </ol>
                    </nav>
                </div>
            </section >
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 order-2 order-md-1">
                            <ul className="list-group mb-3 list-page">
                                <li className="list-group-item bg-main py-3">Các trang đơn  khác</li>

                                {
                                    pageAll && pageAll.length > 0 && pageAll.map((item) => {
                                        return (
                                            <li className="list-group-item">
                                                <Link to={`/post_page/${item.slug}`}>{item.title}</Link>

                                            </li>
                                        )
                                    })

                                }

                            </ul>
                        </div>
                        <div className="col-md-9 order-1 order-md-2">
                            <h1 className="fs-2 text-main">{page.title}</h1>
                            <p>
                                {page.detail}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div >

    )
}
