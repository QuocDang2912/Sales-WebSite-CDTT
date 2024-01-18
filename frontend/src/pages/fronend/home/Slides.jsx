import React, { useEffect, useState } from 'react';
import BennerService from '../../../services/BannerService';
import { urlImage } from '../../../Api/config';
import Loading from '../../../components/Loading';

export default function Slides() {
    const [banners, setBanners] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const res = await BennerService.index();
            setBanners(res.banners);
            setLoading(false)

        })();
    }, []);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    };
    return (
        <>
            <section className="hdl-slideshow">
                <div id="carouselExample" className="carousel slide">
                    <div className="carousel-inner">
                        {banners.map((banner, index) => (
                            <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                                <img style={{ height: "550px" }} src={urlImage + "banner/" + banner.image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                        {loading ? <Loading /> : ""}

                    </div>
                    <button className="carousel-control-prev" type="button" onClick={handlePrev}>
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" onClick={handleNext}>
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
        </>
    );
}