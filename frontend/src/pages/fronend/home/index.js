import React from 'react'

import Slides from './Slides'
import LastPost from './LastPost'
import ProductNew from './ProductNew'
import ProductSale from './ProductSale'
import ProductByCategory from './ProductByCategory'
import ProductHotBuy from './ProductHotBuy'
import ThreeInfo from './ThreeInfo'
import BrowseOurCategory from './BrowseOurCategory'

export default function Home() {
    return (
        <>

            <Slides />
            <section className='hdl-maincontent'>
                <div className='container'>
                    <ThreeInfo />
                    <ProductNew />
                    <ProductSale />
                    <ProductHotBuy />
                    {/* <ProductByCategory /> */}
                    <BrowseOurCategory />
                    <LastPost />
                </div>
            </section>
        </>
    )
}
