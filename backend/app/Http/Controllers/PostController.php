<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    function index()
    {
        $post = Post::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'topic_id', 'image', 'title', 'detail', 'status')
            ->get();
        $total = Post::count();
        $result = [
            'status' => true,
            'post' => $post,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $post = Post::find($id);

        if ($post === null) {
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
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail;
        $post->type = $request->type;
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
        if ($post == null) {
            $result = [
                'status' => false,
                'Post' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $post->topic_id = $request->topic_id;
        $post->title = $request->title;
        $post->slug = Str::of($request->title)->slug('-');
        $post->detail = $request->detail;
        $post->type = $request->type;
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
            'message' => 'Khoong the them du lieu'
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
            'brand' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
}
