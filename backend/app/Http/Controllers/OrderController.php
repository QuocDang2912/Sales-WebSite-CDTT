<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Orderdetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;

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
        $order->total = $request->total;

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

        $brand->delivery_name = $request->delivery_name;
        $brand->delivery_email = $request->delivery_email;
        $brand->delivery_phone = $request->delivery_phone;
        $brand->delivery_address = $request->delivery_address;
        $brand->delivery_gender = $request->delivery_gender;
        $brand->note = $request->note;
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
    function restore(Request $request, $id)
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
        // $brand = Order::where('order.status', '==', 0) // chỉnh về 3
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
            ->select('product.image', 'product.name', 'orderdetail.qty', 'orderdetail.price', 'orderdetail.discount')
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

    function status(Request $request, $id)
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

    public function getOrdersByUserId($userId)
    {
        // Retrieve orders associated with the given user ID
        $orders = Order::where('user_id', $userId)->get();

        // Check if any orders were found
        if ($orders->isEmpty()) {
            $result = [
                'status' => false,
                'message' => 'No orders found for the specified user ID.'
            ];
            return response()->json($result, 404);
        }

        // Iterate over each order to fetch its order details and calculate total amount
        foreach ($orders as $order) {
            // Retrieve order details including product image associated with the current order
            $orderDetails = Orderdetail::where('order_id', $order->id)
                ->join('product', 'product.id', '=', 'orderdetail.product_id')
                ->select('product.image', 'product.name', 'orderdetail.qty', 'orderdetail.price', 'orderdetail.discount')
                ->get();
            $order->order_details = $orderDetails;
        }

        // If orders were found, return them in the response
        $result = [
            'status' => true,
            'orders' => $orders,
            'message' => 'Orders and their details retrieved successfully for the specified user ID.'
        ];
        return response()->json($result, 200);
    }




    //  mo mo
    public function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        //execute post
        $result = curl_exec($ch);
        //close connection
        curl_close($ch);
        return $result;
    }


    public function momo_pay(Request $request)
    {
        $total_momo = $request->input('total_momo');

        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
        //cc
        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $orderInfo = "Thanh toán qua ATM MoMo";
        $amount = $total_momo;
        $orderId = time() . "";
        // $redirectUrl = "http://127.0.0.1:8000/";
        // $ipnUrl = "http://127.0.0.1:8000/";
        $redirectUrl = "http://localhost:3000/checkout";
        $ipnUrl = "http://localhost:3000/checkout";
        $extraData = "";

        $requestId = time() . "";
        $requestType = "payWithATM";

        //before sign HMAC SHA256 signature
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );
        $result = $this->execPostRequest($endpoint, json_encode($data));
        // dd($result);
        $jsonResult = json_decode($result, true);  // decode json


        //Just a example, please check more in there
        return response()->json($jsonResult, 200);

        // return redirect()->to($jsonResult['payUrl']);
    }


    // test thống kê:

    // thống kê từ ngày bn -> bn
    public function filterByDateRange(Request $request)
    {
        $validatedData = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $startDate = $validatedData['start_date'];
        $endDate = $validatedData['end_date'];

        $orders = Order::whereBetween('order.created_at', [$startDate, $endDate])
            ->join('user', 'user.id', '=', 'order.user_id')
            ->orderBy('order.created_at', 'desc')
            ->select('order.*', 'user.name as user_name')
            ->get();
        $count = $orders->count('id');
        $totalAmount = $orders->sum('total');


        return response()->json([
            'status' => true,
            'orders' => $orders,
            'count' => $count,
            'total_amount' => $totalAmount,
            'message' => 'Data loaded successfully'
        ], 200);
    }


    // thống kê lọc theo option tùy chọn
    public function filterByValue(Request $request)
    {
        $validatedData = $request->validate([
            'value' => 'required|string|in:7ngay,namnay,thangnay',
        ]);

        $value = $validatedData['value'];

        switch ($value) {
            case '7ngay':
                $endDate = Carbon::now();
                $startDate = $endDate->copy()->subDays(7);
                break;
            case 'namnay':
                $endDate = Carbon::now();
                $startDate = Carbon::now()->startOfYear();
                break;
            case 'thangnay':
                $endDate = Carbon::now();
                $startDate = Carbon::now()->startOfMonth();
                break;
            default:
                return response()->json([
                    'status' => false,
                    'message' => 'value ko hợp lệ'
                ], 400);
        }

        $orders = Order::whereBetween('order.created_at', [$startDate, $endDate])
            ->join('user', 'user.id', '=', 'order.user_id')
            ->orderBy('order.created_at', 'desc')
            ->select('order.*', 'user.name as user_name')
            ->get();

        $totalAmount = $orders->sum('total');
        $count = $orders->count('id');

        return response()->json([
            'status' => true,
            'orders' => $orders,
            'total_amount' => $totalAmount,
            'count' => $count,
            'message' => 'Data successfully'
        ], 200);
    }
}
