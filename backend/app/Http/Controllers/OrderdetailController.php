<?php

namespace App\Http\Controllers;

use App\Models\Orderdetail;
use Illuminate\Http\Request;

class OrderdetailController extends Controller
// orderDetail lỗi
{
    //
    function index()
    {
        $orderdetail = Orderdetail::where('qty', '>=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'order_id', 'product_id', 'price', 'qty', 'discount')
            ->get();
        $total = Orderdetail::count();
        $result = [

            'orderdetail' => $orderdetail,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $orderdetail = Orderdetail::find($id);

        if ($orderdetail === null) {
            $result = [

                'orderdetail' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [

            'orderdetail' => $orderdetail,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $orderdetail = new Orderdetail();
        $orderdetail->order_id = $request->order_id;
        $orderdetail->product_id = $request->product_id;
        $orderdetail->price = $request->price;
        $orderdetail->qty = $request->qty;
        $orderdetail->discount = $request->discount;
        $orderdetail->amount = $request->amount;





        if ($orderdetail->save()) {
            $result = [

                'orderdetail' => $orderdetail,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [

            'orderdetail' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    function update(Request $request, $id)
    {
        $orderdetail = Orderdetail::find($id);
        if ($orderdetail == null) {
            $result = [

                'Orderdetail' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $orderdetail->order_id = $request->order_id;
        $orderdetail->product_id = $request->product_id;
        $orderdetail->price = $request->price;
        $orderdetail->qty = $request->qty;
        $orderdetail->discount = $request->discount;
        $orderdetail->amount = $request->amount;



        if ($orderdetail->save()) {
            $result = [

                'orderdetail' => $orderdetail,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [

            'orderdetail' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $orderdetail = Orderdetail::find($id);
        if ($orderdetail == null) {
            $result = [

                'orderdetail' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($orderdetail->delete()) {
            $result = [

                'orderdetail' => $orderdetail,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [

            'orderdetail' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
}
