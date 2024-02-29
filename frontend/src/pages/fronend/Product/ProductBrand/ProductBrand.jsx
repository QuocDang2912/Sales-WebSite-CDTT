import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductServie from '../../../../services/ProductService'
import { urlImage } from '../../../../Api/config'
import Loading from '../../../../components/Loading'
import CategoryServie from '../../../../services/CategoryService'
import BrandService from '../../../../services/BrandService'
export default function ProductBrand() {
    const { slug } = useParams()

    const [productBrand, setProductBrand] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true)

    // state lấy min max filter
    const [minPrice, setminPrice] = useState(0);
    const [maxPrice, setmaxPrice] = useState(0);

    // sắp sếp tăng
    const [sort_order, setsort_order] = useState('asc');


    // filter chung 
    const [filter, setFilter] = useState({})


    // state left brand and category
    const [category, setCategory] = useState([])
    const [brand, setbrand] = useState([])


    useEffect(() => {

        (
            async () => {
                const res = await ProductServie.productBrand_price(slug, currentPage, minPrice, maxPrice, sort_order)
                console.log(res.products.data)
                setProductBrand(res.products.data)
                setCurrentPage(res.products.current_page);
                setLastPage(res.products.last_page);

                // call brand and category left giao diện
                const fetCate = await CategoryServie.index()
                const fetchbrand1 = await BrandService.index()
                setCategory(fetCate.category)
                setbrand(fetchbrand1.brands)


                setLoading(false)

            }
        )()

    }, [slug, currentPage, minPrice, maxPrice, sort_order])



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFilter(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) => {
        // veef fix chưa tích hợp được 
        event.preventDefault();
        console.log("filter", filter);
        (
            async () => {
                const res = await ProductServie.productBrand_price(slug, currentPage, filter.minPrice, filter.maxPrice, sort_order)
                console.log(res.products.data)
                setProductBrand(res.products.data)
                setCurrentPage(res.products.current_page);
                setLastPage(res.products.last_page);

                setFilter({ minPrice: '', maxPrice: '' });

                setLoading(false)

            }
        )()
    }



    return (
        <div>
            <div>
                <section className="bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb py-2 my-0">
                                        <li className="breadcrumb-item">
                                            <a className="text-main" href="index.html">Trang chủ</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Sản phẩm theo danh mục
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-5">
                                <div className='filter_price'>
                                    <form onSubmit={handleSubmit}>
                                        <label style={{ marginBottom: "10px" }}>Min Price:
                                            <input
                                                type="number"
                                                name="minPrice"
                                                value={filter.minPrice}
                                                onChange={handleChange}
                                                style={{ border: '1px solid #ced4da', outline: 'none', padding: '5px', marginRight: '10px' }}
                                            />
                                        </label>
                                        <label>Max Price:
                                            <input
                                                type="number"
                                                name="maxPrice"
                                                value={filter.maxPrice}
                                                onChange={handleChange}
                                                style={{ border: '1px solid #ced4da', outline: 'none', padding: '5px' }}
                                            />
                                        </label>
                                        <input type="submit" value="Filter" style={{ marginLeft: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }} />
                                    </form>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="filter-sort">
                                    <label>Sort Order:</label>
                                    <select value={sort_order} onChange={(e) => setsort_order(e.target.value)} style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px' }}>
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </section >
                <section className="hdl-maincontent py-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 order-2 order-md-1">
                                <ul className="list-group mb-3 list-category">
                                    <li style={{ backgroundColor: "#0070D2" }} className="list-group-item bg-main py-3">Danh mục sản phẩm</li>
                                    {category && category.length > 0 && category.map((cate) => {
                                        return (
                                            <li key={cate.id} className="list-group-item">
                                                <Link to={`/productcategory/${cate.slug}`}>{cate.name}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <ul className="list-group mb-3 list-brand">
                                    <li style={{ backgroundColor: "#0070D2" }} className="list-group-item bg-main py-3">Thương hiệu</li>
                                    {brand && brand.length > 0 && brand.map((brand) => {
                                        return (
                                            <li key={brand.id} className="list-group-item">
                                                <Link to={`/productbrand/${brand.slug}`}>{brand.name}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>

                            </div>
                            <div className="col-md-9 order-1 order-md-2">
                                <div className="category-title bg-main">
                                    <h3 className="fs-5 py-3 text-center">{slug}</h3>
                                </div>
                                <div className="product-category mt-3">
                                    <div className="row product-list">
                                        {
                                            productBrand && productBrand.length > 0 &&
                                            productBrand.map((product, index) => {
                                                let priceSale = product.pricesale ? product.pricesale : 0

                                                return (
                                                    <div className="col-6 col-md-3 mb-4" key={index}>
                                                        <div className="product-item border">
                                                            <Link to={`/product_detail/${product.slug}`}>

                                                                <div className="product-item-image">
                                                                    <p>
                                                                        <img style={{ width: "350px", height: "350px" }} src={require("../../../../assets/images.jpg")} className="img-fluid" alt='' id="img2" />
                                                                        <img style={{ width: "350px", height: "350px" }} className="img-fluid" src={urlImage + "product/" + product.image} alt='' id="img1" />
                                                                    </p>
                                                                </div>
                                                                <h2 className="product-item-name text-main text-center fs-5 py-1">
                                                                    <p>{product.name}</p>

                                                                </h2>
                                                                <h3 className="product-item-price fs-6 p-2 d-flex">
                                                                    <div className="flex-fill"><del>
                                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceSale)}
                                                                    </del></div>
                                                                    <div className='flex-fill text-end text-main' >
                                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                                                    </div>
                                                                </h3>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        {loading ? <Loading /> : ""}

                                    </div>
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
        </div>
    )
}
