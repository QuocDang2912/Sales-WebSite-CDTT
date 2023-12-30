<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    //
    function index()
    {
        $products = Product::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image', 'price', 'category_id', 'brand_id', 'detail')
            ->get();
        $total = Product::count();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $product = Product::find($id);

        if ($product === null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'product' => $product,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->detail = $request->detail;
        $product->slug = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->file('image');  // Use file() method to get the UploadedFile instance
        if ($image != null && $image->isValid()) {
            $extension = $image->getClientOriginalExtension();
            $image = $request->image;
            if ($image != null) {
                $extension = $image->getClientOriginalExtension();
                if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                    $fileName = date('YmdHis') . '.' . $extension;
                    $image->move(public_path('images/product'), $fileName);
                    $product->image = $fileName;
                }
            }
        }


        // end upload

        $product->description = $request->description;
        $product->price = $request->price;
        $product->created_at = date('Y-m-d H:i:s');
        $product->created_by = 1; //tam
        $product->status = $request->status;

        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $product->name = $request->name;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->detail = $request->detail;
        $product->slug = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->file('image');  // Use file() method to get the UploadedFile instance
        if ($image != null && $image->isValid()) {
            $extension = $image->getClientOriginalExtension();
            $image = $request->image;
            if ($image != null) {
                $extension = $image->getClientOriginalExtension();
                if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                    $fileName = date('YmdHis') . '.' . $extension;
                    $image->move(public_path('images/product'), $fileName);
                    $product->image = $fileName;
                }
            }
        }


        // end upload

        $product->description = $request->description;
        $product->price = $request->price;
        $product->created_at = date('Y-m-d H:i:s');
        $product->created_by = 1; //tam
        $product->status = $request->status;

        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($product->delete()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
}
