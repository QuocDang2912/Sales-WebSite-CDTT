import React, { useEffect, useState } from 'react'
import { urlImage } from '../../../Api/config';
import PostServie from '../../../services/PostService';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';

export default function LastPost() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true)

    //
    useEffect(() => {
        (async () => {
            try {
                const result = await PostServie.postnew();
                console.log("🚀 ~ result:", result)
                setPost(result.postnhat);
                setLoading(false)
            } catch (error) {
                console.log("🚀 ~ error:", error)
            }
        })();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.toLocaleDateString('en-GB', { day: '2-digit' });
        const month = date.toLocaleDateString('en-GB', { month: 'short' }).replace('.', '');
        // return { day, month: `T-${month}` };
        return { day, month: `${month}` };
    };
    return (
        <>
            <h2 class="section-title categories-section-title heading-border border-0 ls-0 "
                data-animation-delay="100" >Bài viết mới nhất
            </h2>

            <div className='blog-section row'>
                {post &&
                    post.map((post, index) => {
                        const { day, month } = formatDate(post.created_at);

                        return (

                            <article className="post col-6 col-md-3 mb-4" key={index}>
                                <Link to={`/post_detail/${post.slug}`}>
                                    <div className="post-media">
                                        <a href="single.html">
                                            <img style={{ width: "300px", height: "280px" }} className="img-fluid" alt='' src={urlImage + "post/" + post.image} />
                                        </a>
                                        <div className="post-date">
                                            {/* <span className="day">26</span>
                                            <span className="month">T-07</span> */}
                                            <span className="day">{day}</span>
                                            <span className="month">{month}</span>
                                        </div>
                                    </div>
                                </Link>
                                {/* End .post-media */}
                                <div className="post-body">
                                    <Link to={`/post_detail/${post.slug}`}>
                                        <h2 className="post-title">
                                            <a href="single.html">{post.title}</a>
                                        </h2>
                                        <div className="post-content">
                                            <p>
                                                {
                                                    post.detail.length > 150 ? (post.detail.slice(0, 150) + "...") : post.detail
                                                }
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                            </article>
                        );
                    })}
                {loading ? <Loading /> : ""}
            </div>


        </>

    );
}
