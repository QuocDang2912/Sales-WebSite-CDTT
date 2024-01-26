<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class CustomerController extends Controller
{
    //
    function index()
    {
        $customner = User::where('status', '!=', 0)
            ->where('roles', '=', 'customer')
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'username', 'status', 'gender', 'phone', 'email')
            ->get();
        $total = User::count();
        $result = [
            'status' => true,
            'customner' => $customner,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $customner = User::find($id);

        if ($customner === null) {
            $result = [
                'status' => false,
                'customner' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'customner' => $customner,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $customner = new User();
        $customner->name = $request->name;
        $customner->username = $request->username;
        $customner->password = bcrypt($request->password); // It's a good practice to hash passwords
        $customner->gender = $request->gender;
        $customner->phone = $request->phone;
        $customner->email = $request->email;
        $customner->roles = $request->roles;
        $customner->created_at = date('Y-m-d H:i:s');
        $customner->created_by = 1; //tam
        $customner->status = $request->status;
        if ($customner->save()) {
            $result = [
                'status' => true,
                'customner' => $customner,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }
        // If save fails
        $result = [
            'status' => false,
            'customner' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $customner = User::find($id);
        if ($customner == null) {
            $result = [
                'status' => false,
                'customner' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $customner->name = $request->name;
        $customner->username = $request->username;
        $customner->password = $request->password;
        $customner->gender = $request->gender;
        $customner->phone = $request->phone;
        $customner->email = $request->email;
        $customner->roles = $request->roles;

        $customner->created_at = date('Y-m-d H:i:s');
        $customner->created_by = 1; //tam
        $customner->status = $request->status;

        if ($customner->save()) {
            $result = [
                'status' => true,
                'customner' => $customner,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'customner' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $customner = User::find($id);
        if ($customner == null) {
            $result = [
                'status' => false,
                'customner' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($customner->delete()) {
            $result = [
                'status' => true,
                'customner' => $customner,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'customner' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status($id)
    {
        $customner = User::find($id);
        if ($customner == null) {
            $result = [
                'status' => false,
                'customner' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $customner->status = ($customner->status == 1) ? 2 : 1;
        $customner->updated_at = date('Y-m-d H:i:s');
        $customner->updated_by = 1; //tam
        if ($customner->save()) {
            $result = [
                'status' => true,
                'customner' => $customner,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'customner' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function delete(Request $request, $id)
    {
        $customner = User::find($id);
        if ($customner == null) {
            $result = [
                'status' => false,
                'customner' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $customner->status = $request->status;
        if ($customner->save()) {
            $result = [
                'status' => true,
                'customner' => $customner,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'customner' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $customner = User::where('status', '=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'username', 'status', 'gender', 'phone', 'email')
            ->get();
        $total = User::count();
        $resul = [
            'status' => true,
            'customner' => $customner,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
}
