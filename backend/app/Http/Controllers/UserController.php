<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    function index()
    {
        $user = User::where('status', '!=', 0)
            ->where('roles', '=', 'admin')
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'username', 'status', 'gender', 'phone', 'email')
            ->get();
        $total = User::count();
        $result = [
            'status' => true,
            'user' => $user,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $user = User::find($id);

        if ($user === null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'user' => $user,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = bcrypt($request->password); // It's a good practice to hash passwords
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->roles = $request->roles;
        $user->created_at = date('Y-m-d H:i:s');
        $user->created_by = 1; //tam
        $user->status = $request->status;
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }
        // If save fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = $request->password;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->roles = $request->roles;

        $user->created_at = date('Y-m-d H:i:s');
        $user->created_by = 1; //tam
        $user->status = $request->status;

        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($user->delete()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $user->status = ($user->status == 1) ? 2 : 1;
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = 1; //tam
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function delete(Request $request, $id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $user->status = $request->status;
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $user = User::where('status', '=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'username', 'status', 'gender', 'phone', 'email')
            ->get();
        $total = User::count();
        $resul = [
            'status' => true,
            'user' => $user,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }


    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // Replace 'User' with the actual model representing your users
        $user = User::where('username', $username)->first();

        if ($user) {
            // Use Hash::check to compare hashed passwords
            if (Hash::check($password, $user->password)) {
                // Authentication successful
                $result = [
                    'status' => true,
                    'message' => 'Login successful',
                    'user' => $user,
                ];
                return response()->json($result, 200);
            }
        }

        // Authentication failed
        $result = [
            'status' => false,
            'message' => 'Invalid username or password',
        ];
        return response()->json($result, 401);
    }
    //
    public function changePassword(Request $request, $id)
    {
        $user = User::find($id);

        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Không tìm thấy người dùng',
            ];
            return response()->json($result, 404);
        }

        // Kiểm tra mật khẩu cũ
        if (!Hash::check($request->old_password, $user->password)) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Mật khẩu cũ không chính xác',
            ];
            return response()->json($result, 422);
        }

        // Cập nhật mật khẩu mới
        $user->password = bcrypt($request->new_password);

        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Đổi mật khẩu thành công',
            ];
            return response()->json($result, 200);
        }

        // Nếu cập nhật thất bại
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Không thể đổi mật khẩu',
        ];
        return response()->json($result, 500);
    }
}
