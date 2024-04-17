<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Models\Category;
use App\Models\Topic;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::prefix('banner')->group(function () {
//     Route::get('/index', [BannerController::class, 'index']);
// });
Route::get('/', function () {
    return view('welcome');
});
Route::get('index', [BrandController::class, 'index']);
Route::get('index', [BannerController::class, 'index']);
Route::get('index', [CategoryController::class, 'index']);
Route::get('index', [Topic::class, 'index']);
