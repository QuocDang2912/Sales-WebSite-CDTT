<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class CustomerController extends Controller
{
    //
    public function index($status)
    {
        if ($status == 'index') {
            $customers = User::where([
                ['status', '!=', 0],
                ['roles', '=', 'customer'],
            ])
                ->select('id', 'name', 'username', 'status', 'image', 'phone', 'email')
                ->orderBy('created_at')
                ->get();
        } else {
            $customers = User::where([
                ['status', '=', $status],
                ['roles', '=', 'customer'],
            ])
                ->select('id', 'name', 'username', 'status', 'image')
                ->orderBy('created_at')
                ->get();
        }
        $count_all = User::where('roles', 'customer')->count();
        $count_trash = User::where([
            ['status', '=', 0],
            ['roles', '=', 'customer'],
        ])->count();

        $result = [
            'status' => true,
            'message' => 'Tài dữ liệu thành công',
            'customers' => $customers,
            'count_all' => $count_all,
            'count_trash' => $count_trash,
        ];

        return response()->json($result, 200);
    }
    public function store(Request $request)
    {
        $customer = new User();
        $customer->name = $request->name;
        $customer->username = $request->username;
        $customer->password = bcrypt($request->password);
        $customer->gender = $request->gender;
        $customer->phone = $request->phone;
        $customer->email = $request->email;
        $customer->roles = 'customer';
        $customer->address = $request->address;
        $customer->status = $request->status;

        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/user'), $fileName);
                $customer->image = $fileName;
            }
        }
        $customer->created_by = Auth::id() ?? 1;
        $customer->created_at = date('Ymd H:i:s');

        $customer->save();
        $result = [
            'status' => true,
            'customer' => $customer,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }
    public function show(string $id)
    {
        $customer = User::where([['id', '=',  $id], ['roles', 'customer']])->first();

        if ($customer == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'customer' => null,
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => true,
            'message' => 'tải dữ thành công',
            'customer' => $customer,
        ];

        return response()->json($result, 200);
    }
    public function edit(string $id)
    {
        $customer = User::where([['id', '=',  $id], ['roles', 'customer']])->first();
        if ($customer == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'customer' => null,
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => true,
            'message' => 'Tìm thấy thông tin',
            'customer' => $customer,
        ];

        return response()->json($result, 200);
    }
    public function update(Request $request, string $id)
    {

        $customer = User::where([['id', '=',  $id], ['roles', 'customer']])->first();
        if ($customer == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'customer' => null,
            ];
            return response()->json($result, 200);
        }
        $customer->name = $request->name;
        $customer->username = $request->username;
        $customer->password = bcrypt($request->password);
        $customer->gender = $request->gender;
        $customer->phone = $request->phone;
        $customer->email = $request->email;
        $customer->roles = 'customer';
        $customer->address = $request->address;
        $customer->status = $request->status;

        $image = $request->image;
        if ($image != null) {

            if (File::exists(public_path('images/user/' . $customer->image))) {
                File::delete(public_path('images/user/' . $customer->image));
            }

            $extension = $image->getClientOriginalExtension();
            $fileName = date('YmdHis') . '.' . $extension;
            $image->move(public_path('images/user'), $fileName);
            $customer->image = $fileName;
        }
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = Auth::id() ?? 1;
        $customer->save();

        $result = [
            'status' => true,
            'message' => 'tải thành công',
            'customer' => $customer,
        ];

        return response()->json($result, 200);
    }
    public function status(string $id)
    {
        $customer = User::where([['id', '=',  $id], ['roles', 'customer']])->first();
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $customer->status = ($customer->status == 1) ? 2 : 1;
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = Auth::id() ?? 1;
        $customer->save();
        $result = [
            'status' => true,
            'customer' => $customer,
            'message' => 'Cap nhat du lieu thanh cong'
        ];

        return response()->json($result, 200);

        // If save fails

    }
    // xóa vào thùng rác 
    public function delete(string $id)
    {
        $customer = User::where([['id', '=',  $id], ['roles', 'customer']])->first();
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $customer->status = 0;
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = Auth::id() ?? 1;
        $customer->save();
        $result = [
            'status' => true,
            'customer' => $customer,
            'message' => 'tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }
    // khôi phục
    public function restore(string $id)
    {
        $customer = User::where([['id', '=',  $id], ['roles', 'customer']])->first();
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $customer->status = 2;
        $customer->updated_at = date('Y-m-d H:i:s');
        $customer->updated_by = Auth::id() ?? 1;
        $customer->save();
        $result = [
            'status' => true,
            'customer' => $customer,
            'message' => 'tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }
    // xóa khỏi csdl
    public function destroy(string $id)
    {
        $customer = User::where([['status', '=', 0], ['roles', '=', 'customer'],])->first();
        if ($customer == null) {
            $result = [
                'status' => false,
                'customer' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        if (File::exists(public_path('images/user/' . $customer->image))) {
            File::delete(public_path('images/user/' . $customer->image));
        }
        $customer->delete();
        $result = [
            'status' => true,
            'customer' => $customer,
            'message' => 'tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }
}
