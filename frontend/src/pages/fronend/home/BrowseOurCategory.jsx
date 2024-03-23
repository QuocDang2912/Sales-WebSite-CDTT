import React, { useEffect, useState } from 'react'
import CategoryServie from '../../../services/CategoryService'
import { Link } from 'react-router-dom'
import { urlImage } from '../../../Api/config'
export default function BrowseOurCategory() {

    const [category, setCategory] = useState([])
    // const [totalCategory, setTotalCategory] = useState(0)


    useEffect(() => {
        const fetch = async () => {
            const res = await CategoryServie.index()
            // console.log("🚀 ~ fetch ~ res:", res)

            setCategory(res.category)
            // setTotalCategory(res.total)
        }
        fetch()
    }, [])
    return (
        <>
            <h2 class="section-title categories-section-title heading-border border-0 ls-0 "
                data-animation-delay="100" >Browse Our Categories
            </h2>
            <div class="categories-slider show-nav-hover nav-outer row product-list ">

                {
                    category.length > 0 && category.map((cate, index) => {
                        return (
                            <div class="product-category col-6 col-md-3 mb-4 " key={index} >
                                <Link to={`/productcategory/${cate.slug}`}>
                                    <a href="#st" key={index}>
                                        <figure>
                                            <img className="img-fluid" src={urlImage + "category/" + cate.image} style={{ width: "300px", height: "240px" }} alt="category" />

                                        </figure>
                                        <div class="category-content">
                                            <h3>{cate.name}</h3>
                                            <span>
                                                {/* <mark class="count">3</mark> */}
                                                {cate.slug}</span>
                                        </div>
                                    </a>
                                </Link>

                            </div>
                        )
                    }
                    )
                }




            </div>
        </>
    )
}
