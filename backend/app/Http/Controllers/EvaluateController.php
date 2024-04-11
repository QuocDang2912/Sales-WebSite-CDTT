<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Evaluate;
use App\Models\Product;

class EvaluateController extends Controller
{
    function index()
    {
        $evaluates = Evaluate::where('evaluate.status', '!=', 0)
            ->join('product', 'evaluate.product_id', '=', 'product.id')
            ->orderBy('evaluate.created_at', 'desc')
            ->select('evaluate.id', 'evaluate.product_id', 'evaluate.rate', 'evaluate.user_id', 'evaluate.status', 'product.*')
            ->get();
        $total = Evaluate::count();
        $result = [
            'status' => true,
            'evaluates' => $evaluates,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function index1()
    {
        $evaluates = Evaluate::where('evaluate.status', '=', 1)
            ->join('product', 'evaluate.product_id', '=', 'product.id')
            ->orderBy('evaluate.created_at', 'desc')
            ->select('evaluate.id', 'evaluate.product_id', 'evaluate.rate', 'evaluate.user_id', 'evaluate.status', 'product.*')
            ->get();
        $total = Evaluate::count();
        $result = [
            'status' => true,
            'evaluates' => $evaluates,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $evaluate = Evaluate::find($id);
        if ($evaluate == null) {
            $result = [
                'status' => false,
                'evaluate' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'evaluate' => $evaluate,
            'message' => 'Tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        // Kiểm tra tồn tại của post_id trong bảng Post
        if (!Product::where('id', $request->product_id)->exists()) {
            return response()->json(['message' => 'product_id không hợp lệ'], 400);
        }

        $evaluate = new Evaluate();
        $evaluate->product_id = $request->product_id;
        $evaluate->rate = $request->rate;
        $evaluate->user_id = $request->user_id;
        $evaluate->created_at = date('Y-m-d H:i:s');
        $evaluate->created_by = 1; //tam
        $evaluate->status = $request->status;

        if ($evaluate->save()) {
            $result = [
                'status' => true,
                'evaluate' => $evaluate,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'evaluate' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $evaluate = Evaluate::find($id);
        if ($evaluate == null) {
            $result = [
                'status' => false,
                'evaluate' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $evaluate->product_id = $request->product_id;
        $evaluate->rate = $request->rate;
        $evaluate->user_id = $request->user_id;
        $evaluate->created_at = date('Y-m-d H:i:s');
        $evaluate->created_by = 1; //tam
        $evaluate->status = $request->status;
        $evaluate->updated_at = date('Y-m-d H:i:s');
        $evaluate->updated_by = 1; //tam
        $evaluate->status = $request->status;

        if ($evaluate->save()) {
            $result = [
                'status' => true,
                'evaluate' => $evaluate,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'evaluate' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function status($id)
    {
        $evaluate = Evaluate::find($id);
        if ($evaluate == null) {
            $result = [
                'status' => false,
                'evaluate' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $evaluate->status = ($evaluate->status == 1) ? 2 : 1;
        $evaluate->updated_at = date('Y-m-d H:i:s');
        $evaluate->updated_by = 1; //tam
        if ($evaluate->save()) {
            $result = [
                'status' => true,
                'evaluate' => $evaluate,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'evaluate' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $evaluate = Evaluate::find($id);
        if ($evaluate == null) {
            $result = [
                'status' => false,
                'evaluate' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($evaluate->delete()) {
            $result = [
                'status' => true,
                'evaluate' => $evaluate,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'evaluate' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    ////xoá
    function delete(Request $request, $id)
    {
        $evaluate = Evaluate::find($id);
        if ($evaluate == null) {
            $result = [
                'status' => false,
                'evaluate' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $evaluate->status = $request->status;
        if ($evaluate->save()) {
            $result = [
                'status' => true,
                'evaluate' => $evaluate,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }
        // If save fails
        $result = [
            'status' => false,
            'evaluate' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    public function thungrac()
    {
        $evaluate = Evaluate::where('evaluate.status', '=', 0)
            ->join('product', 'evaluate.product_id', '=', 'product.id')
            ->orderBy('evaluate.created_at', 'desc')
            ->select('evaluate.id', 'evaluate.product_id', 'evaluate.rate', 'evaluate.user_id', 'evaluate.status', 'product.*')
            ->get();
        $total = Evaluate::count();
        $resul = [
            'status' => true,
            'evaluate' => $evaluate,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
}
