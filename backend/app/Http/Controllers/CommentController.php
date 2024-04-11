<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;

class CommentController extends Controller
{


    // function index($postId)
    // {
    //     // Lấy tất cả các bình luận cho bài viết có post_id tương ứng
    //     $comments = Comment::where('comment.status', '!=', 0)
    //         ->join('post as p', function ($join) use ($postId) {
    //             $join->on('comment.post_id', '=', 'p.id')
    //                 ->where('p.id', '=', $postId)
    //                 ->where('p.type', '=', 'post');
    //         })
    //         ->join('user', 'comment.user_id', '=', 'user.id')
    //         ->orderBy('comment.created_at', 'desc')
    //         ->select('comment.id', 'comment.post_id', 'comment.content', 'comment.rep_content_id', 'comment.user_id', 'comment.status', 'comment.created_at', 'p.id as post_id', 'user.name')
    //         ->get();

    //     // Tạo một mảng để lưu trữ các bình luận
    //     $commentThreads = [];

    //     foreach ($comments as $comment) {
    //         // Kiểm tra nếu rep_content_id của bình luận khác null
    //         if ($comment->rep_content_id !== null) {
    //             // Lấy thông tin của người được trả lời
    //             $repliedUser = Comment::where('id', $comment->rep_content_id)->value('user_id');
    //             if ($repliedUser) {
    //                 $repliedUserInfo = User::find($repliedUser);
    //                 if ($repliedUserInfo) {
    //                     $comment->replied_user_name = $repliedUserInfo->name; // Lưu tên người được trả lời vào bình luận
    //                 }
    //             }
    //         }
    //         $commentThreads[] = $comment;
    //     }


    //     $total = Comment::where('post_id', $postId)->count();

    //     $result = [
    //         'status' => true,
    //         'comments' => $commentThreads,
    //         'message' => 'Tải dữ liệu thành công',
    //         'total' => $total
    //     ];
    //     return response()->json($result, 200);
    // }


    // function index($postId)
    // {
    //     // Lấy tất cả các bình luận cho bài viết có post_id tương ứng
    //     $comments = Comment::where('comment.status', '!=', 0)
    //         ->join('post as p', function ($join) use ($postId) {
    //             $join->on('comment.post_id', '=', 'p.id')
    //                 ->where('p.id', '=', $postId)
    //                 ->where('p.type', '=', 'post');
    //         })
    //         ->join('user', 'comment.user_id', '=', 'user.id')
    //         ->orderBy('comment.created_at', 'desc')
    //         ->select('comment.id', 'comment.post_id', 'comment.content', 'comment.rep_content_id', 'comment.user_id', 'comment.status', 'comment.created_at', 'p.id as post_id', 'user.name')
    //         ->get();

    //     // Tạo một mảng để lưu trữ các bình luận
    //     $commentThreads = [];

    //     // Gom các bình luận vào một mảng dựa trên id
    //     $commentById = [];
    //     foreach ($comments as $comment) {
    //         $commentById[$comment->id] = $comment;
    //         $comment->replies = collect(); // Tạo một thuộc tính 'replies' cho mỗi bình luận
    //     }

    //     // Gắn bình luận con vào bình luận cha tương ứng
    //     foreach ($comments as $comment) {
    //         if ($comment->rep_content_id !== null && isset($commentById[$comment->rep_content_id])) {
    //             // Nếu là bình luận con và bình luận cha tồn tại trong mảng đã gom
    //             $commentById[$comment->rep_content_id]->replies->push($comment);
    //         } else {
    //             // Nếu không phải bình luận con hoặc không tìm thấy bình luận cha, thêm vào mảng gốc
    //             $commentThreads[] = $comment;
    //         }
    //     }

    //     $total = Comment::where('post_id', $postId)->count();

    //     $response = [
    //         'status' => true,
    //         'comments' => $commentThreads,
    //         'message' => 'Tải dữ liệu thành công',
    //         'total' => $total
    //     ];

    //     return response()->json($response, 200);
    // }

    function index($postId)
    {
        // Lấy tất cả các bình luận cho bài viết có post_id tương ứng
        $comments = Comment::where('comment.status', '!=', 0)
            ->join('post as p', function ($join) use ($postId) {
                $join->on('comment.post_id', '=', 'p.id')
                    ->where('p.id', '=', $postId)
                    ->where('p.type', '=', 'post');
            })
            ->join('user', 'comment.user_id', '=', 'user.id')
            ->orderBy('comment.created_at', 'desc')
            ->select('comment.id', 'comment.post_id', 'comment.content', 'comment.rep_content_id', 'comment.user_id', 'comment.status', 'comment.created_at', 'p.id as post_id', 'user.name')
            ->get();

        // Tạo một mảng để lưu trữ các bình luận
        $commentThreads = [];

        // Gom các bình luận vào một mảng dựa trên id
        $commentById = [];
        foreach ($comments as $comment) {
            $commentById[$comment->id] = $comment;
            $comment->replies = collect(); // Tạo một thuộc tính 'replies' cho mỗi bình luận
        }

        // Gắn bình luận con vào bình luận cha tương ứng
        foreach ($comments as $comment) {
            if ($comment->rep_content_id !== null && isset($commentById[$comment->rep_content_id])) {
                // Nếu là bình luận con và bình luận cha tồn tại trong mảng đã gom
                $parentComment = $commentById[$comment->rep_content_id];
                $parentComment->replies->push($comment);

                // Lấy thông tin của người được trả lời và gán vào bình luận con
                $repliedUser = User::find($parentComment->user_id);
                if ($repliedUser) {
                    $comment->replied_user_name = $repliedUser->name;
                }
            } else {
                // Nếu không phải bình luận con hoặc không tìm thấy bình luận cha, thêm vào mảng gốc
                $commentThreads[] = $comment;
            }
        }

        $total = Comment::where('post_id', $postId)->count();

        $response = [
            'status' => true,
            'comments' => $commentThreads,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];

        return response()->json($response, 200);
    }











    function store(Request $request)
    {
        // Kiểm tra tồn tại của post_id trong bảng Post
        if (!Post::where('id', $request->post_id)->exists()) {
            return response()->json(['message' => 'post_id không hợp lệ'], 400);
        }

        $comment = new Comment();
        $comment->post_id = $request->post_id;
        $comment->content = $request->content;
        $comment->rep_content_id = $request->rep_content_id;
        $comment->user_id = $request->user_id;
        $comment->created_at = date('Y-m-d H:i:s');
        $comment->created_by = 1; //tam
        $comment->status = $request->status;

        if ($comment->save()) {
            $result = [
                'status' => true,
                'comment' => $comment,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'comment' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $comment = Comment::find($id);
        if ($comment == null) {
            $result = [
                'status' => false,
                'comment' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'comment' => $comment,
            'message' => 'Tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }



    function update(Request $request, $id)
    {
        $comment = Comment::find($id);
        if ($comment == null) {
            $result = [
                'status' => false,
                'comment' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $comment->post_id = $request->post_id;
        $comment->content = $request->content;
        $comment->rep_content_id = $request->rep_content_id;
        $comment->user_id = $request->user_id;
        $comment->created_at = date('Y-m-d H:i:s');
        $comment->created_by = 1; //tam
        $comment->status = $request->status;
        $comment->updated_at = date('Y-m-d H:i:s');
        $comment->updated_by = 1; //tam
        $comment->status = $request->status;

        if ($comment->save()) {
            $result = [
                'status' => true,
                'comment' => $comment,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'comment' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function status($id)
    {
        $comment = Comment::find($id);
        if ($comment == null) {
            $result = [
                'status' => false,
                'comment' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $comment->status = ($comment->status == 1) ? 2 : 1;
        $comment->updated_at = date('Y-m-d H:i:s');
        $comment->updated_by = 1; //tam
        if ($comment->save()) {
            $result = [
                'status' => true,
                'comment' => $comment,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'comment' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $comment = Comment::find($id);
        if ($comment == null) {
            $result = [
                'status' => false,
                'comment' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($comment->delete()) {
            $result = [
                'status' => true,
                'comment' => $comment,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'comment' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    ////xoá
    function delete(Request $request, $id)
    {
        $comment = Comment::find($id);
        if ($comment == null) {
            $result = [
                'status' => false,
                'comment' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $comment->status = $request->status;
        if ($comment->save()) {
            $result = [
                'status' => true,
                'comment' => $comment,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }
        // If save fails
        $result = [
            'status' => false,
            'comment' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    public function thungrac()
    {
        $comment = Comment::where('comment.status', '=', 0)
            ->join('post', function ($join) {
                $join->on('comment.post_id', '=', 'post.id')
                    ->where('post.type', '=', 'post');
            })
            ->orderBy('comment.created_at', 'desc')
            ->select('comment.id', 'comment.post_id', 'comment.content', 'comment.rep_content_id', 'comment.user_id', 'comment.status', 'post.*')
            ->get();
        $total = Comment::count();
        $resul = [
            'status' => true,
            'comment' => $comment,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
}
