<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Orderdetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{


    // order thêm ko thay đổi
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
    // order thêm ko thay đổi
    //

    public function index($status)
    {
        if ($status != `index`) {
            $order = Order::where('order.status', '!=', 0)
                ->join('user', 'user.id', '=', 'order.user_id')
                ->orderBy('order.created_at', 'desc')
                ->select('order.*', 'user.name')
                ->get();
        } else {
            $order = Order::where('order.status', '=', $status)
                ->join('user', 'user.id', '=', 'order.user_id')
                ->orderBy('order.created_at', 'desc')
                ->select('order.*', 'user.name')
                ->get();
        }

        $total = Order::count();
        $resul = [
            'status' => true,
            'order' => $order,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }



    function status($id)
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

        $order->status = ($order->status == 1) ? 2 : 1;
        $order->updated_at = date('Y-m-d H:i:s');
        $order->updated_by = 1; //tam
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
    function update(Request $request, $id)
    {
        $brand = Order::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $brand->name = $request->name;
        $brand->link = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/order'), $fileName);
                $brand->image = $fileName;
            }
        }


        $brand->description = $request->description;
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = 1; //tam
        $brand->status = $request->status;

        if ($brand->save()) {
            $result = [
                'status' => true,
                'order' => $brand,
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
        $orderdetail = Orderdetail::where('order_id', '=', $id)->get();
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        foreach ($orderdetail->all() as $item) {
            $item->delete();
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
            'order' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }

    function delete(Request $request, $id)
    {
        $brand = Order::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $brand->status = $request->status;
        if ($brand->save()) {
            $result = [
                'status' => true,
                'order' => $brand,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    public function thungrac()
    {
        $brand = Order::where('order.status', '==', 0)
            ->join('user', 'user.id', '=', 'order.user_id')
            ->orderBy('order.created_at', 'desc')
            ->select('order.*', 'user.name')
            ->get();
        $total = Order::count();
        $resul = [
            'status' => true,
            'order' => $brand,
            'message' => 'Tai du lieu thanh cong1',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }


    public function show($id)
    {
        $order = Order::find($id);
        $orderdetail = Orderdetail::where('orderdetail.order_id', $id)
            ->join('product', 'product.id', '=', 'orderdetail.product_id')
            ->select('product.image', 'product.name', 'orderdetail.qty', 'orderdetail.price', 'orderdetail.amount')
            ->get();
        // $customer = User::where([['id', $order->user_id], ['roles', '=', '1']])->first(); // của thầy ['roles', '=', '1'] 
        $customer = User::where([['id', $order->user_id], ['roles', '=', 'customer']])->first(); // của mình 
        $total = 0;
        foreach ($orderdetail as $r) {
            $total += ($r->qty * $r->price);
        }
        if ($order == null) {
            $resul = [
                'status' => false,
                'order' => null,
                'message' => 'khong tim thay'

            ];
            return response()->json($resul, 404);
        }
        $resul = [
            'status' => true,
            'order' => $order,
            'orderdetail' => $orderdetail,
            'user' => $customer,
            'message' => 'Tai du lieu thanh cong1',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }

    public function getOrdersByUserId($userId)      // hàm lấy được id đơn hàng của user , rồi tiếp khi lấy được id của order
    // rồi thì trở lên hàm show của giao diện
    {
        $orders = Order::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        if ($orders->isEmpty()) {
            $result = [
                'status' => false,
                'orders' => null,
                'message' => 'Không có đơn hàng cho người dùng này'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'orders' => $orders,
            'message' => 'Lấy dữ liệu thành công'
        ];
        return response()->json($result, 200);
    }
    // dữ liệu trả về
    // "orders": [
    //     {
    //         "id": 19,  => id của order
    //         "user_id": 18,
    //         "delivery_name": "alice",
    //         "delivery_gender": "0",
    //         "delivery_email": "quoc@gmail.com",
    //         "delivery_phone": "333333",
    //         "delivery_address": "quảng ngãi",
    //         "note": "1",
    //         "created_at": "2024-01-22T17:10:19.000000Z",
    //         "updated_at": "2024-01-26T18:12:49.000000Z",
    //         "created_by": 1,
    //         "updated_by": 1,
    //         "status": 1
    //     }
    // ],
}
