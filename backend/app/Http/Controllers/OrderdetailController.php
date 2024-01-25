<?php

namespace App\Http\Controllers;

use App\Models\Orderdetail;
use Illuminate\Http\Request;

class OrderdetailController extends Controller

{
    // me
    function store(Request $request)
    {


        $products = $request->input('products', []);

        // Initialize an empty array to store order details
        $orderDetails = [];

        foreach ($products as $product) {
            $orderdetail = new Orderdetail();
            $orderdetail->order_id = $request->input('order_id');
            $orderdetail->product_id = $product['product_id'];
            $orderdetail->price = $product['price'];
            $orderdetail->qty = $product['qty'];
            $orderdetail->discount = $product['discount'];
            $orderdetail->amount = $product['amount'];

            $orderdetail->save();

            // Add the order detail to the array
            $orderDetails[] = $orderdetail;
        }

        $result = [
            'orderdetails' => $orderDetails,
            'message' => 'Thêm dữ liệu thành công' // Fixed the Vietnamese message
        ];

        return response()->json($result, 200);
    }
    // form store lên có dạng 
    //     {
    //         "order_id": 123,
    //         "products": [
    //           {
    //             "product_id": 1,
    //             "price": 10.99,
    //             "qty": 2,
    //             "discount": 0.5,
    //             "amount": 19.99
    //           },
    //           {
    //             "product_id": 2,
    //             "price": 15.99,
    //             "qty": 1,
    //             "discount": 0.2,
    //             "amount": 12.99
    //           }
    //         ]
    // }

    // của bún bò
    public function store1(Request $request)
    {

        foreach ($request->all() as $item) {
            $banner = new Orderdetail();
            $banner->order_id = $item['order_id'];
            $banner->product_id = $item['product_id'];
            $banner->price = $item['price'];
            $banner->qty = $item['qty'];
            $banner->discount = $item['discount'];

            $banner->amount = $item['amount'];

            $banner->save();
        }

        // Trả về response thành công
        $result = [
            'status' => true,
            'message' => 'Cập nhật dữ liệu thành công'
        ];
        return response()->json($result, 200);
    }
}
