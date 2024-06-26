<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //phương thức xác thực
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    // public function register(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'username' => 'required',
    //         'email' => 'required|string|email|unique:user',
    //         'password' => 'required|string|min:8',
    //         'name' => 'required',
    //         'gender' => 'required',
    //         'phone' => 'required',
    //         'roles' => 'required',
    //         'status' => 'required',
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json($validator->errors()->toJson(), 400);
    //     }
    //     $user = User::create(array_merge(
    //         $validator->validated(),
    //         [
    //             'password' => bcrypt($request->password),
    //             'created_at' => now(),
    //             'created_by' => 1,
    //         ]
    //     ));
    //     return response()->json([
    //         'message' => 'Bạn đã đăng ký tài khoản thành công.',
    //         'user' => $user
    //     ], 201);
    // }

    // public function login(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'username' => 'required',
    //         'password' => 'required|string|min:8',
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 422);
    //     }
    //     if (!$token = auth()->attempt($validator->validated())) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }
    //     //đăng nhập thành công thì trả về response chứa access token
    //     return $this->createNewToken($token);
    // }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'email' => 'required|string|email|unique:user',
            'password' => 'required|string|min:8',
            'name' => 'required',
            'gender' => 'required',
            'phone' => 'required',
            'roles' => 'required',
            // 'status' => 'required', // No need to validate this as we are setting it by default
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password),
                'status' => 0, // Set status to 0 by default
                'created_at' => now(),
                'created_by' => 1,
            ]
        ));

        return response()->json([
            'message' => 'Bạn đã đăng ký tài khoản thành công.',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('username', 'password');

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth()->user();

        if ($user->status != 1) {
            return response()->json(['error' => 'Tài khoản chưa được kích hoạt'], 401);
        }

        // Successful login, return response with access token
        return $this->createNewToken($token);
    }
    public function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer', // Fix typo here: 'beare' -> 'bearer'
            'expires_in' => FacadesAuth::factory()->getTTL() * 60,
            'user' => auth()->user() //lấy thông tin user đăng nhập
        ]);
    }

    public function profile()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();
        return response()->json([
            'message' => 'Tài khoản đã đăng xuất.',
        ]);
    }
}
