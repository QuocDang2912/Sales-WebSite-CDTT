import React from 'react'

import Slides from './Slides'
import LastPost from './LastPost'
import ProductNew from './ProductNew'
import ProductSale from './ProductSale'
import ProductHotBuy from './ProductHotBuy'
import ThreeInfo from './ThreeInfo'
import BrowseOurCategory from './BrowseOurCategory'
import ProductAll1 from '../Product/ProductAll/ProductAll1'
export default function Home() {
    document.title = "Trang chủ";

    return (

        <>
            <Slides />
            <section className='hdl-maincontent'>
                <div className='container'>
                    <ThreeInfo />
                    <ProductNew />
                    <ProductSale />
                    <ProductHotBuy />
                    <ProductAll1 />
                    <BrowseOurCategory />
                    <LastPost />
                </div>
            </section>
        </>
    )
}
