<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    function index()
    {
        $order = Order::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'user_id', 'delivery_name', 'delivery_email', 'delivery_phone', 'created_at', 'status')
            ->get();
        $total = Order::count();
        $result = [
            'status' => true,
            'order' => $order,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $order = Order::find($id);

        if ($order === null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'order' => $order,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $order = new Order();
        $order->user_id = $request->user_id;
        $order->delivery_name = $request->delivery_name;
        $order->delivery_gender = $request->delivery_gender;
        $order->delivery_email = $request->delivery_email;
        $order->delivery_phone = $request->delivery_phone;
        $order->delivery_address = $request->delivery_address;
        $order->note = $request->note;

        $order->created_at = date('Y-m-d H:i:s');
        $order->created_by = 1; //tam
        $order->status = $request->status;

        if ($order->save()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    function update(Request $request, $id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'Order' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $order->user_id = $request->user_id;
        $order->delivery_name = $request->delivery_name;
        $order->delivery_gender = $request->delivery_gender;
        $order->delivery_email = $request->delivery_email;
        $order->delivery_phone = $request->delivery_phone;
        $order->delivery_address = $request->delivery_address;
        $order->note = $request->note;
        $order->created_at = date('Y-m-d H:i:s');
        $order->created_by = 1; //tam
        $order->status = $request->status;

        if ($order->save()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($order->delete()) {
            $result = [
                'status' => true,
                'order' => $order,
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
