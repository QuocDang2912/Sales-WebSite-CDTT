<?php

use App\Http\Controllers\BannerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderdetailController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\User;
use App\Http\Controllers\UserController;
use App\Models\Menu;
use App\Models\Order;
use App\Models\Orderdetail;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::prefix('banner')->group(function () {
//     Route::get('/index', [BannerController::class, 'index']);
// });
Route::prefix('brand')->group(function () {
    Route::get('index', [BrandController::class, 'index']);
    Route::get('show/{id}', [BrandController::class, 'show']);
    Route::post('store', [BrandController::class, 'store']);
    Route::post('update/{id}', [BrandController::class, 'update']);
    Route::delete('destroy/{id}', [BrandController::class, 'destroy']);
    Route::get('status/{id}', [BrandController::class, 'status']);
});

Route::prefix('banner')->group(function () {
    Route::get('index', [BannerController::class, 'index']);
    Route::get('show/{id}', [BannerController::class, 'show']);
    Route::post('store', [BannerController::class, 'store']);
    Route::post('update/{id}', [BannerController::class, 'update']);
    Route::delete('destroy/{id}', [BannerController::class, 'destroy']);
    Route::get('status/{id}', [BannerController::class, 'status']);
});
Route::prefix('category')->group(function () {
    Route::get('index', [CategoryController::class, 'index']);
    Route::get('show/{id}', [CategoryController::class, 'show']);
    Route::post('store', [CategoryController::class, 'store']);
    Route::post('update/{id}', [CategoryController::class, 'update']);
    Route::delete('destroy/{id}', [CategoryController::class, 'destroy']);
    Route::get('status/{id}', [CategoryController::class, 'status']);
});

Route::prefix('contact')->group(function () {
    Route::get('index', [ContactController::class, 'index']);
    Route::get('show/{id}', [ContactController::class, 'show']);
    Route::post('store', [ContactController::class, 'store']);
    Route::post('postreply/{id}', [ContactController::class, 'postreply']);
    Route::delete('destroy/{id}', [ContactController::class, 'destroy']);
    Route::get('status/{id}', [ContactController::class, 'status']);
});





Route::prefix('post')->group(function () {
    Route::get('index', [PostController::class, 'index']);
    Route::get('show/{id}', [PostController::class, 'show']);
    Route::post('store', [PostController::class, 'store']);
    Route::post('update/{id}', [PostController::class, 'update']);
    Route::delete('destroy/{id}', [PostController::class, 'destroy']);
    Route::get('status/{id}', [PostController::class, 'status']);

    Route::get('postnew', [PostController::class, 'post_new']);
    Route::get('post_detail/{slug}', [PostController::class, 'post_detail']);
});
Route::prefix('page')->group(function () {
    Route::get('index', [PageController::class, 'index']);
    Route::get('show/{id}', [PageController::class, 'show']);
    Route::post('store', [PageController::class, 'store']);
    Route::post('update/{id}', [PageController::class, 'update']);
    Route::delete('destroy/{id}', [PageController::class, 'destroy']);
    Route::get('status/{id}', [PageController::class, 'status']);
});






Route::prefix('topic')->group(function () {
    Route::get('index', [TopicController::class, 'index']);
    Route::get('show/{id}', [TopicController::class, 'show']);
    Route::post('store', [TopicController::class, 'store']);
    Route::post('update/{id}', [TopicController::class, 'update']);
    Route::delete('destroy/{id}', [TopicController::class, 'destroy']);
    Route::get('status/{id}', [TopicController::class, 'status']);
});

Route::prefix('user')->group(function () {
    Route::get('index', [UserController::class, 'index']);
    Route::get('show/{id}', [UserController::class, 'show']);
    Route::post('store', [UserController::class, 'store']);
    Route::post('update/{id}', [UserController::class, 'update']);
    Route::delete('destroy/{id}', [UserController::class, 'destroy']);
    Route::get('status/{id}', [UserController::class, 'status']);
});


Route::prefix('customer')->group(function () {
    Route::get('index/{status}', [CustomerController::class, 'index']);
    Route::post('store', [CustomerController::class, 'store']);
    Route::get('show/{id}', [CustomerController::class, 'show']);
    Route::post('update/{id}', [CustomerController::class, 'update']);
    Route::get('status/{id}', [CustomerController::class, 'status']);
    Route::get('delete/{id}', [CustomerController::class, 'delete']);
    Route::get('restore/{id}', [CustomerController::class, 'restore']);
    Route::delete('destroy/{id}', [CustomerController::class, 'destroy']);
});

// Route::prefix('export')->group(function () {
//     Route::get('/', [ExportController::class, 'index']);
//     Route::get('trash', [ExportController::class, 'trash']);
//     Route::post('store', [ExportController::class, 'store']);
//     Route::get('show/{id}', [ExportController::class, 'show']);
//     Route::post('update/{id}', [ExportController::class, 'update']);
//     Route::get('status/{id}', [ExportController::class, 'status']);
//     Route::get('delete/{id}', [ExportController::class, 'delete']);
//     Route::get('restore/{id}', [ExportController::class, 'restore']);
//     Route::delete('destroy/{id}', [ExportController::class, 'destroy']);
// });


Route::prefix('menu')->group(function () {
    Route::get('index/{status}', [MenuController::class, 'index']);
    Route::get('trash', [MenuController::class, 'trash']);
    Route::post('store', [MenuController::class, 'store']);
    Route::get('show/{id}', [MenuController::class, 'show']);
    Route::post('update/{id}', [MenuController::class, 'update']);
    Route::get('status/{id}', [MenuController::class, 'status']);
    Route::get('delete/{id}', [MenuController::class, 'delete']);
    Route::get('restore/{id}', [MenuController::class, 'restore ']);
    Route::delete('destroy/{id}', [MenuController::class, 'destroy']);
});


Route::prefix('order')->group(function () {
    Route::get('index/{status}', [OrderController::class, 'index']);
    Route::post('store', [OrderController::class, 'store']);
    Route::get('show/{id}', [OrderController::class, 'show']);
    Route::post('update/{id}', [OrderController::class, 'update']);
    Route::get('status/{id}', [OrderController::class, 'status']);
    Route::get('delete/{id}', [OrderController::class, 'delete']);
    Route::get('restore/{id}', [OrderController::class, 'restore']);
    Route::delete('destroy/{id}', [OrderController::class, 'destroy']);
});

Route::prefix('product')->group(function () {
    Route::get('index', [ProductController::class, 'index']);
    Route::get('show/{id}', [ProductController::class, 'show']);
    Route::post('store', [ProductController::class, 'store']);
    Route::post('update/{id}', [ProductController::class, 'update']);
    Route::delete('destroy/{id}', [ProductController::class, 'destroy']);
    Route::get('status/{id}', [ProductController::class, 'status']);


    Route::get('productnew/{limit}', [ProductController::class, 'productnew']);
    Route::get('productsale/{limit}', [ProductController::class, 'productsale']);

    Route::get('producthotbuy/{limit}', [ProductController::class, 'producthotbuy']);

    Route::get('product_category_home/{id}', [ProductController::class, 'product_category_home']);
    Route::get('product_detail/{slug}', [ProductController::class, 'product_detail']);
    // mới
    Route::post('storeimport', [ProductController::class, 'storeimport']);
    //Sản phẩm khuyến mãi
    Route::get('sale', [ProductController::class, 'sale']);
    Route::post('storesale', [ProductController::class, 'storesale']);
    // all product
    Route::get('product_all', [ProductController::class, 'product_all']);
    // product category
    Route::get('product_category/{slug}', [ProductController::class, 'product_category']);
    // product brand
    Route::get('product_brand/{slug}', [ProductController::class, 'product_brand']);
});

// Route::prefix('product')->group(function () {
//     Route::get('index/{status}', [ProductController::class, 'index']);
//     Route::post('store', [ProductController::class, 'store']);
//     Route::get('import', [ProductController::class, 'import']);
//     Route::get('show/{id}', [ProductController::class, 'show']);
//     Route::post('update/{id}', [ProductController::class, 'update']);
//     Route::get('status/{id}', [ProductController::class, 'status']);
//     Route::get('delete/{id}', [ProductController::class, 'delete']);
//     Route::get('restore/{id}', [ProductController::class, 'restore']);
//     Route::delete('destroy/{id}', [ProductController::class, 'destroy']);

//     Route::post('storeimport', [ProductController::class, 'storeimport']);
//     //Sản phẩm khuyến mãi
//     Route::get('sale', [ProductController::class, 'sale']);
//     Route::post('storesale', [ProductController::class, 'storesale']);
// });


Route::get('brand_list', [BrandController::class, 'brand_list']);
Route::get('category_parentid/{id}', [CategoryController::class, 'category_parentid']);
Route::get('menu_parentid/{id}', [MenuController::class, 'menu_parentid']);
Route::get('banner_slider/{position}', [BannerController::class, 'banner_slider']);




Route::get('post_lastnew', [PostController::class, 'post_lastnew']);
Route::get('post_all/{slug}', [PostController::class, 'post_all']);
Route::get('post_topic/{slug}', [PostController::class, 'post_topic']);

Route::get('post_page/{slug}', [PostController::class, 'post_page']);
