<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Str;

class PageController extends Controller
{
    function index()
    {
        $pages = Post::where('status', '!=', 0)
            ->where('type', '=', 'page')
            ->orderBy('created_at', 'desc')
            ->select('id', 'title', 'detail', 'image', 'description', 'status', 'type', 'slug')
            ->get();
        $total = Post::count();
        $result = [
            'status' => true,
            'pages' => $pages,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $page = Post::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'page' => $page,
            'message' => 'Tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $page = new Post();
        $page->topic_id = $request->topic_id;
        $page->title = $request->title;
        $page->detail = $request->detail;
        $page->type = $request->type;
        $page->slug = Str::of($request->title)->slug('-');

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
                    $page->image = $fileName;
                }
            }
        }
        // end upload
        $page->description = $request->description;
        $page->created_at = date('Y-m-d H:i:s');
        $page->updated_at = date('Y-m-d H:i:s');
        $page->created_by = 1; //tam
        $page->status = $request->status;

        if ($page->save()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'page' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $page = Post::find($id);
        $page->topic_id = $request->topic_id;
        $page->title = $request->title;
        $page->detail = $request->detail;
        $page->type = $request->type;
        $page->slug = Str::of($request->title)->slug('-');

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
                    $page->image = $fileName;
                }
            }
        }


        // end upload
        $page->description = $request->description;
        $page->created_at = date('Y-m-d H:i:s');
        $page->updated_at = date('Y-m-d H:i:s');
        $page->created_by = 1; //tam
        $page->status = $request->status;

        if ($page->save()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'page' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $page = Post::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($page->delete()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'page' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status($id)
    {
        $page = Post::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $page->status = ($page->status == 1) ? 2 : 1;
        $page->updated_at = date('Y-m-d H:i:s');
        $page->updated_by = 1;
        if ($page->save()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }
        // If save fails
        $result = [
            'status' => false,
            'page' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    //
    function delete(Request $request, $id)
    {
        $page = Post::find($id);
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $page->status = $request->status;
        if ($page->save()) {
            $result = [
                'status' => true,
                'page' => $page,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'page' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $page = Post::where('status', '=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'title', 'detail', 'image', 'description', 'status', 'type', 'slug')
            ->get();
        $total = Post::count();
        $resul = [
            'status' => true,
            'page' => $page,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }


    ///
    function post_page($slug)
    {
        $page = Post::where('slug', $slug)
            ->where('status', '!=', 0)
            ->first();
        if ($page == null) {
            $result = [
                'status' => false,
                'page' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'page' => $page,
            'message' => 'Tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }
}
