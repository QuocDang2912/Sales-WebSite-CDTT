<?php

namespace App\Http\Controllers;

use App\Models\Discountcode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DiscountcodeController extends Controller
{
    public function index()
    {

        $Discountcode = Discountcode::where('status', '!=', 0)

            ->where('expires_bd', '<=', now()) // Thời gian hết hạn phải lớn hơn hoặc bằng thời gian hiện tại
            ->where('expires_kt', '>=', now()) // Thời gian hết hạn phải lớn hơn hoặc bằng thời gian hiện tại
            ->get();
        $total = Discountcode::count();
        $resul = [
            'status' => true,
            'Discountcode' => $Discountcode,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }

    public function store(Request $request)
    {
        $Discountcode = new Discountcode();
        $Discountcode->title = $request->title;
        $Discountcode->code = Str::random(12);
        $Discountcode->percentage = $request->percentage;
        $Discountcode->description = $request->description;
        $Discountcode->expires_bd = $request->expires_bd;
        $Discountcode->expires_kt = $request->expires_kt;
        $Discountcode->type = $request->type;
        $Discountcode->created_at = date('Y-m-d H:i:s');
        $Discountcode->updated_at = date('Y-m-d H:i:s');
        $Discountcode->created_by = 1; //tam
        $Discountcode->updated_by = 1; //tam
        $Discountcode->status = $request->status;


        if ($Discountcode->save()) {
            $result = [
                'status' => true,
                'Discountcode' => $Discountcode,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'Discountcode' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    public function show($id)
    {
        $brand = Discountcode::find($id);
        if ($brand == null) {
            $resul = [
                'status' => false,
                'Discountcode' => null,
                'message' => 'khong tim thay'
            ];
            return response()->json($resul, 404);
        }
        $resul = [
            'status' => true,
            'Discountcode' => $brand,
            'message' => 'Tai du lieu thanh cong'
        ];
        return response()->json($resul, 200);
    }

    public function checkDiscountCode(Request $request)
    {
        // Lấy mã code từ request
        $code = $request->code;

        // Kiểm tra xem mã code có tồn tại không và còn trong thời gian giảm giá hay không
        $discountCode = Discountcode::where('code', '=', $code)
            ->where('status', '=', 1) // Chỉ kiểm tra các mã có status là 1 (đã kích hoạt)
            ->where('expires_bd', '<=', now()) // Thời gian hết hạn phải lớn hơn hoặc bằng thời gian hiện tại
            ->where('expires_kt', '>=', now()) // Thời gian hết hạn phải lớn hơn hoặc bằng thời gian hiện tại
            ->first();

        if ($discountCode) {
            $result = [
                'status' => true,
                'discountCode' => $discountCode,
                'message' => 'success'
            ];
        } else {
            $result = [
                'status' => $code,
                'discountCode' => null,
                'message' => 'error'
            ];
        }

        return response()->json($result, 200);
    }
}
