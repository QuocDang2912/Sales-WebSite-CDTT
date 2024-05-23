<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminAuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        if (Auth::check()) {
            // Lấy thông tin người dùng hiện tại
            $user = Auth::user();

            // Kiểm tra vai trò của người dùng
            if ($user->roles === 'admin') {
                // Ghi log thông tin về người dùng đã đăng nhập và vai trò của họ
                Log::info('User logged in:', ['id' => $user->id, 'username' => $user->username, 'roles' => $user->roles]);

                // Cho phép yêu cầu tiếp theo xử lý
                return $next($request);
            }
        }

        // Ghi log khi truy cập bị từ chối (Unauthorized)
        Log::info('Unauthorized access detected.');

        // Trả về phản hồi lỗi Unauthorized
        return response()->json(['status' => false, 'message' => 'Unauthorized'], 401);
    }
}
