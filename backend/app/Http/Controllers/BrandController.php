<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    function index()
    {
        $brands = Brand::where('status', '!=', 0)
            ->orderby('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Brand::count();
        $result = [
            'status' => true,
            'brands' => $brands,
            'message' => 'tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'khong tim thay du lieu',

            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'brand' => $brand,
            'message' => ' tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }
    function store(Request $request)
    {
        $brand = new Brand;
        $brand->name = $request->name;
        $brand->slug = Str::of($request->name)->slug('-');
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/brand'), $fileName);
                $brand->image = $fileName;
            }
        }
        $brand->sort_order = $request->sort_order;
        $brand->description = $request->description;
        $brand->created_at = date('Y-m-d H:i:s');
        $brand->created_by = 1;
        $brand->status = $request->status;
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'brand' => null,
            'message' => ' khong the them du lieu',

        ];
        return response()->json($result, 200);
    }
    function update($request, $id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'khong tim thay du lieu',

            ];
            return response()->json($result, 404);
        }
        $brand->name = $request->name;
        $brand->slug = Str::of($request->name)->slug('-');
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/brand'), $fileName);
                $brand->image = $fileName;
            }
        }
        $brand->sort_order = $request->sort_order;
        $brand->description = $request->description;
        $brand->created_at = date('Y-m-d H:i:s');
        $brand->created_by = 1;
        $brand->status = $request->status;
        if ($brand->save()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'brand' => null,
            'message' => ' khong the them du lieu',
        ];
        return response()->json($result, 200);
    }
    function destroy($id)
    {
        $brand = Brand::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'khong tim thay du lieu',

            ];
            return response()->json($result, 404);
        }
        if ($brand->delete()) {
            $result = [
                'status' => true,
                'brand' => $brand,
                'message' => 'cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'brand' => null,
            'message' => ' khong the them du lieu',
        ];
    }
}
