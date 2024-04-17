import React, { useEffect, useState } from 'react'
import PostServie from '../../../services/PostService'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../../components/Loading'
import { useSelector } from "react-redux";
import CommentService from '../../../services/Comment'



export default function PostDetail() {
    const [post, setPost] = useState([])
    const [related_posts, setrelated_posts] = useState([])
    const [loading, setLoading] = useState(true)
    const [reload, setReLoad] = useState(0);
    // post cmt
    const [inputs, setInputs] = useState({});
    const [commeent, setComment] = useState([])

    const { slug } = useParams()
    useEffect(() => {

        const fetch = async () => {

            try {
                const res = await PostServie.PostDetail(slug)
                setPost(res.post)
                setrelated_posts(res.related_posts)


                // call comment

                const callComment = await CommentService.index(post.id)
                console.log("🚀 ~ fetch ~ callComment:", callComment)
                setComment(callComment.comments)
                setLoading(false)
            } catch (error) {

                console.log(error)

            }
        }
        fetch()

    }, [slug, post.id, reload])


    //  submit cmt


    let user = useSelector((state) => state.user.current);


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }



    // rep content

    const handleClickRep = (comment) => {
        console.log("🚀 ~ handleClickRep ~ comment:", comment)
        const repliedUserName = comment.name;
        setInputs(prevInputs => ({ rep_content_id: comment.id, ...prevInputs, content: `@${repliedUserName}` }));
        console.log("ccccc:", inputs)
    }
    // form post content
    const FormCmt = {
        ...inputs,
        user_id: user.id,
        post_id: post.id,
        status: 1,
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        (async () => {
            const result = await CommentService.store(FormCmt);
            console.log("🚀 ~ result:", result)

            document.getElementById('idreset').reset();
            setInputs({})
            setReLoad(result.comment.id);
        })();
    }

    function renderComments(comments, isChild = false, levelCount = 0) {
        // Mức độ thụt vào cho mỗi cấp (đơn vị: px)
        const indentationSize = 50;
        const indentationLevel = levelCount < 2 && isChild ? levelCount : 0;

        return (
            <ul style={{ padding: "0px" }}>
                {comments.map((comment, index) => (
                    <React.Fragment key={comment.id}>
                        <li style={{ marginLeft: `${indentationLevel * indentationSize}px`, }}>
                            <div className="post-author">
                                <figure>
                                    <a href="#st">
                                        <img src={require('../image/avata.jpg')} alt="author" width="50px" />
                                    </a>
                                </figure>
                                <div className="author-content">
                                    <h4><a href="#st">{comment.name}</a></h4>
                                    <p style={{ fontSize: "20px" }}>
                                        <b style={{ marginRight: "4px", color: "black" }}>{comment.replied_user_name}</b>
                                        <span>{comment.content}</span>
                                    </p>
                                    <div className='rep'>
                                        <b onClick={() => { handleClickRep(comment) }} style={{ fontSize: "20px", color: "#4267b2", marginRight: "7px" }} href="">Trả Lời</b>
                                        <span>{comment.created_at}</span>
                                    </div>
                                </div>
                            </div>
                            {comment.replies.length > 0 && renderComments(comment.replies, true, levelCount + 1)}
                        </li>
                        {index !== comments.length - 1 && !isChild && <hr />} {/* Thêm đường gạch ngăn cách sau mỗi bình luận cha */}
                    </React.Fragment>
                ))}
            </ul>
        );
    }

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
                                Chi tiết bài viết
                            </li>
                        </ol>
                    </nav>
                </div>
            </section >
            <section className="hdl-maincontent py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 order-2 order-md-1">
                            <h1 className="fs-2 text-main">{post.title}</h1>
                            <p style={{ marginBottom: "70px" }}>
                                {post.detail}
                            </p>
                            <h3>Phần Bình Luận</h3>
                            <div className="comment-respond">
                                <form onSubmit={handleSubmit} id='idreset'>
                                    <p>Vui Lòng Bình Luận Trước Khi Đăng Nhập *</p>
                                    <div className="form-group" style={{ marginBottom: "20px" }}>
                                        <label name="content"
                                            style={{ color: "#222529", fontSize: "20px" }}>Bình Luận</label>
                                        <textarea name='content' value={inputs.content || ""}
                                            onChange={handleChange} cols={30} rows={1} className="form-control" required defaultValue={""} style={{ border: "1px solid #ccc", borderRadius: "4px" }} />
                                    </div>
                                    <div className="form-footer my-0">
                                        <button type="submit" className="btn btn-sm btn-primary">Đăng
                                            Bình Luận</button>
                                    </div>
                                </form>
                            </div>
                            {commeent.length > 0 && renderComments(commeent)}
                        </div>
                        <div className="col-md-4 order-1 order-md-2">
                            <h3 className="fs-4 text-main">
                                <strong>Bài viết khác</strong>
                            </h3>
                            <ul className="post-list-other">
                                {
                                    related_posts && related_posts.length > 0 &&
                                    related_posts.map((post, index) => {
                                        return (
                                            <div>
                                                <Link to={`/post_detail/${post.slug}`}>

                                                    <h2 className="post-item-title text-main fs-3">
                                                        <p>
                                                            {post.title}
                                                        </p>
                                                    </h2>
                                                    <p style={{ color: "black" }}>{post.detail}</p>
                                                </Link>
                                            </div>

                                        )
                                    })
                                }
                                {loading ? <Loading /> : ""}
                            </ul>

                        </div>
                    </div>
                </div >
            </section >
        </div >
    )
}



