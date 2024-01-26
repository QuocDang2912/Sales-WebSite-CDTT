import React, { useEffect, useState } from 'react'
import { urlImage } from '../../../Api/config';
import PostServie from '../../../services/PostService';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';

export default function LastPost() {
    const [post, setPost] = useState([]);
    const [post1, setPost1] = useState([]);
    const [loading, setLoading] = useState(true)

    //
    useEffect(() => {
        (async () => {
            try {
                const result = await PostServie.postnew();

                setPost(result.postnhat);
                setPost1(result.postsau);
                setLoading(false)
            } catch (error) {
                console.log("🚀 ~ error:", error)
            }

        })();
    }, []);

    return (
        <section className="hdl-lastpost bg-main mt-3 py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>BÀI VIẾT MỚI</h3>
                        <div className="row">
                            {post &&
                                post.map((post, index) => {
                                    return (
                                        <div className="col-md-6">
                                            <Link to={`/post_detail/${post.slug}`}>

                                                <span>
                                                    <img alt='' className="img-fluid" src={urlImage + "post/" + post.image} />
                                                </span>
                                                <h3 className="post-title fs-4 py-2">
                                                    <span>{post.title}</span>
                                                </h3>
                                            </Link>
                                            <p> {post.detail}</p>
                                        </div>
                                    );
                                })}

                            <div className="col-md-6">
                                {post1 && post1.length > 0 &&
                                    post1.map((post1, index) => {
                                        return (
                                            <div className="row mb-3">
                                                <Link to={`/post_detail/${post1.slug}`}>
                                                    <div className="col-md-4">
                                                        <a>
                                                            <img className="img-fluid" src={urlImage + "post/" + post1.image} alt='' />
                                                        </a>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <h3 className="post-title fs-5">
                                                            <span>{post1.title}</span>
                                                        </h3>
                                                    </div>
                                                </Link>
                                                <p>{post1.detail}</p>

                                            </div>
                                        );
                                    })}
                                {loading ? <Loading /> : ""}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
