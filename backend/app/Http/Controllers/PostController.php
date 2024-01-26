<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    function index()
    {
        $posts = Post::where('status', '!=', 0)
            ->where('type', '=', 'post')
            ->orderBy('created_at', 'desc')
            ->select('id', 'title', 'detail', 'image', 'description', 'status', 'type')
            ->get();
        $total = Post::count();
        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'post' => $post,
            'message' => 'Tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $post = new Post();
        $post->topic_id = $request->topic_id;
        $post->title = $request->title;
        $post->detail = $request->detail;
        $post->type = $request->type;
        $post->slug = Str::of($request->title)->slug('-');

        // Upload file -- reactjs
        $image = $request->file('image');  // Use file() method to get the UploadedFile instance
        if ($image != null && $image->isValid()) {
            $extension = $image->getClientOriginalExtension();
            $image = $request->image;
            if ($image != null) {
                $extension = $image->getClientOriginalExtension();
                if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                    $fileName = date('YmdHis') . '.' . $extension;
                    $image->move(public_path('images/post'), $fileName);
                    $post->image = $fileName;
                }
            }
        }


        // end upload
        $post->description = $request->description;
        $post->created_at = date('Y-m-d H:i:s');
        $post->updated_at = date('Y-m-d H:i:s');
        $post->created_by = 1; //tam
        $post->status = $request->status;

        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $post = Post::find($id);
        $post->topic_id = $request->topic_id;
        $post->title = $request->title;
        $post->detail = $request->detail;
        $post->type = $request->type;
        $post->slug = Str::of($request->title)->slug('-');

        // Upload file -- reactjs
        $image = $request->file('image');  // Use file() method to get the UploadedFile instance
        if ($image != null && $image->isValid()) {
            $extension = $image->getClientOriginalExtension();
            $image = $request->image;
            if ($image != null) {
                $extension = $image->getClientOriginalExtension();
                if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                    $fileName = date('YmdHis') . '.' . $extension;
                    $image->move(public_path('images/post'), $fileName);
                    $post->image = $fileName;
                }
            }
        }


        // end upload
        $post->description = $request->description;
        $post->created_at = date('Y-m-d H:i:s');
        $post->updated_at = date('Y-m-d H:i:s');
        $post->created_by = 1; //tam
        $post->status = $request->status;

        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($post->delete()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status($id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $post->status = ($post->status == 1) ? 2 : 1;
        $post->updated_at = date('Y-m-d H:i:s');
        $post->updated_by = 1;
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }
        // If save fails
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    public function post_new()
    {
        $postnhat = Post::where('status', '!=', 0)
            ->where('type', '=', 'post')
            ->orderBy('created_at', 'desc')
            ->select('id', 'title', 'detail', 'status', 'image', 'slug')
            ->limit(1)
            ->get();
        $postsau = Post::where('status', '!=', 0)
            ->where('type', '=', 'post')
            ->orderBy('created_at', 'desc')
            ->select('id', 'title', 'detail', 'status', 'image', 'slug')
            ->skip(1) // Bỏ qua 1 bài viết (bài mới nhất)
            ->take(2) // Lấy 2 bài viết (từ số 2 đến số 3)
            ->limit(2)
            ->get();
        $total = Post::count();
        $resul = [
            'status' => true,
            'postnhat' => $postnhat,
            'postsau' => $postsau,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
    // post_detail
    function post_detail($slug)
    {
        $post = Post::where('slug', $slug)
            ->where('status', '!=', 0)
            ->first();

        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        // Tìm nạp các bài viết liên quan dựa trên cùng một chủ đề_id
        $relatedPosts = Post::where('topic_id', $post->topic_id)
            ->where('status', '!=', 0)
            ->where('id', '!=', $post->id) //Loại trừ bài viết hiện tại

            ->take(3) // Điều chỉnh số lượng bài viết liên quan theo nhu cầu
            ->get();

        $result = [
            'status' => true,
            'post' => $post,
            'related_posts' => $relatedPosts,
            'message' => 'Tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }

    // post all
    function post_all()
    {
        $perPage = 4; // Đặt số lượng sản phẩm trên mỗi trang
        $posts = Post::where('status', '!=', 0)
            ->where('type', '=', 'post')
            ->orderBy('created_at', 'desc')
            ->select('id', 'title', 'detail', 'image', 'description', 'status', 'type', 'slug')
            ->paginate($perPage); // Move paginate() before get()

        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }
    // post theo topic
    public function post_topic($slug)
    {
        $perPage = 4; // Đặt số lượng sản phẩm trên mỗi trang

        $args = [
            ['status', '=', 1],
            ['slug', '=', $slug]
        ];
        $topic = Topic::where($args)->first();

        $posts = Post::where([['post.topic_id', '=', $topic->id], ['post.status', '=', 1]])
            ->orderBy('post.created_at', 'desc')
            ->paginate($perPage);
        $result = [
            'status' => true,
            'posts' => $posts,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }


    function delete(Request $request, $id)
    {
        $post = Post::find($id);
        if ($post == null) {
            $result = [
                'status' => false,
                'post' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $post->status = $request->status;
        if ($post->save()) {
            $result = [
                'status' => true,
                'post' => $post,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'post' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $post = Post::where('status', '=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'title', 'slug', 'status', 'image')
            ->get();
        $total = Post::count();
        $resul = [
            'status' => true,
            'post' => $post,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
}
