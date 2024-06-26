import React, { useEffect, useState } from "react";
import CategoryServie from "../../../services/CategoryService";
import { Link } from "react-router-dom";
import { urlImage } from "../../../Api/config";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Loading from "../../../components/Loading";

export default function BrowseOurCategory() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await CategoryServie.index();
        // console.log("cete", res)
        setCategory(res.category);
        setLoading(false);

      } catch (error) {
        console.log("🚀 ~ fetch ~ error:", error);
      }

      // setTotalCategory(res.total)
    };
    fetch();
  }, []);
  return (
    <>
      <h2
        class="section-title categories-section-title heading-border border-0 ls-0 "
        data-animation-delay="100"
      >
        Các chủng loại
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <OwlCarousel
          className="owl-theme"
          margin={10}
          nav
          dots={true}
          items={4}
          autoplay
          responsive={{
            0: {
              items: 1,
            },
            600: {
              items: 2,
            },
            1000: {
              items: 4,
            },
          }}
        >
          {category.length > 0 &&
            category.map((cate, index) => {
              return (
                <div class="item" key={index}>
                  <Link to={`/productcategory/${cate.slug}`}>
                    <a href="#st" key={index}>
                      <figure>
                        <img
                          className="img-fluid"
                          src={urlImage + "category/" + cate.image}
                          style={{ width: "300px", height: "240px" }}
                          alt="category"
                        />
                      </figure>
                      <div class="category-content">
                        <h3>{cate.name}</h3>
                        <span>
                          {/* <mark class="count">3</mark> */}
                          {cate.slug}
                        </span>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
        </OwlCarousel>
      )}

    </>
  );
}
