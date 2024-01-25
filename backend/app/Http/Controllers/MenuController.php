<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Menu;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    //
    public  function index()
    {
        $menu = Menu::where('status', '!=', 0)
            ->select('id', 'name', 'link', 'type', 'position', 'status')
            ->orderBy('created_at')
            ->get();
        $brands = Brand::where('status', '!=', 0)
            ->select('id', 'name', 'slug', 'status')
            ->orderBy('created_at')
            ->get();

        $categories = Category::where('status', '!=', 0)
            ->select('id', 'name', 'slug', 'status')
            ->orderBy('created_at')
            ->get();

        $topics = Topic::where('status', '!=', 0)
            ->select('id', 'name', 'slug', 'status')
            ->orderBy('created_at')
            ->get();
        $pages = Post::where('status', '!=', 0)
            ->select('id', 'title', 'slug', 'status')
            ->orderBy('created_at')
            ->get();
        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => "Tai du lieu thanh cong",
            'brands' => $brands,
            'categories' => $categories,
            'topics' => $topics,
            'pages' => $pages,

        ];
        return response()->json($result, 200);
    }
    function getAllMenus()
    {
        // Lấy tất cả các menu cấp cha (parent_id = 0)
        // $parentMenus = Menu::where([['parent_id', 0],['status','=',1]])->get();
        $parentMenus = Menu::where([['parent_id', 0]])->get();

        $result = [
            'status' => true,
            'parentMenus' => [],
            'message' => 'Tải dữ liệu thành công'
        ];

        // Duyệt qua từng menu cấp cha
        foreach ($parentMenus as $parentMenu) {
            // Lấy tất cả các menu con của menu cha
            // $childMenus = Menu::where([['parent_id', $parentMenu->id],['status','=',1]])->get();
            $childMenus = Menu::where([['parent_id', $parentMenu->id]])->get();

            // Thêm thông tin menu cấp cha và các menu con vào kết quả
            $result['parentMenus'][] = [
                'parentMenu' => $parentMenu,
                'childMenus' => $childMenus,
            ];
        }

        return response()->json($result, 200);
    }

    // hiển thị thùng rác
    public function trash()
    {
        $menu = Menu::where('status', '!=', 0)
            ->select('id', 'name', 'link', 'type', 'position', 'status')
            ->orderBy('created_at')
            ->get();
        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => "Tai du lieu thanh cong",
            // 'count_all' => $count_all,
            // 'count_trash' => $count_trash
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $menu = Menu::find($id);

        if ($menu === null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        if (isset($request->ADDCATEGORY)) {
            $listcategoryid = $request->categoryid;
            foreach ($listcategoryid as $id) {
                $category = Category::find($id);
                $menu = new Menu();

                $menu->name = $category->name;
                $menu->link = "danh-muc/" . $category->slug;

                $menu->description = $category->description;
                $menu->position = $request->position;
                $menu->parent_id = $request->parent_id;
                $menu->type = 'category';
                $menu->table_id = $category->id;
                $menu->status = 2;

                $menu->created_by = Auth::id() ?? 1;
                $menu->created_at = date('Ymd H:i:s');
                $menu->save();
            }
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tai du lieu thanh cong'
            ];

            return response()->json($result, 200);
        }
        if (isset($request->ADDBRAND)) {
            $listbrandid = $request->brandid;
            foreach ($listbrandid as $id) {
                $brand = Brand::find($id);
                $menu = new Menu();

                $menu->name = $brand->name;
                $menu->link = 'thuong-hieu/' . $brand->slug;

                $menu->description = $brand->description;
                $menu->position = $request->position;

                $menu->parent_id = $request->parent_id;
                $menu->type = 'brand';
                $menu->table_id = $brand->id;
                $menu->status = 2;
                $menu->created_by = Auth::id() ?? 1;
                $menu->created_at = date('Ymd H:i:s');
                $menu->save();
            }
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tai du lieu thanh cong'
            ];

            return response()->json($result, 200);
        }
        if (isset($request->ADDTOPIC)) {
            $listtopicid = $request->topicid;

            foreach ($listtopicid as $id) {

                $topic = Topic::find($id);
                $menu = new Menu();

                $menu->name = $topic->name;
                $menu->link = 'chu-de/' . $topic->slug;
                $menu->description = $topic->name;
                $menu->position = $request->position;
                $menu->parent_id = $request->parent_id;
                $menu->type = 'topic';
                $menu->table_id = $topic->id;
                $menu->status = 2;
                $menu->created_by = Auth::id() ?? 1;
                $menu->created_at = date('Ymd H:i:s');

                $menu->save();
            }
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tai du lieu thanh cong'
            ];

            return response()->json($result, 200);
        }
        if (isset($request->ADDPAGE)) {
            $listpageid = $request->pageid;

            foreach ($listpageid as $id) {
                $page = Post::find($id);
                $menu = new Menu();
                $menu->name = $page->title;
                $menu->link = 'trang-don/' . $page->slug;
                $menu->description = $page->title;
                $menu->parent_id = $request->parent_id;
                $menu->position = $request->position;
                $menu->type = 'page';
                $menu->table_id = $page->id;
                $menu->status = 2;
                $menu->created_by = Auth::id() ?? 1;
                $menu->created_at = date('Ymd H:i:s');

                $menu->save();
            }
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tai du lieu thanh cong'
            ];

            return response()->json($result, 200);
        }
        if (isset($request->ADDCUSTOM)) {
            $menu = new Menu();

            $menu->name = $request->name;
            $menu->link = $request->link;
            $menu->description = " ";
            $menu->position = $request->position;
            $menu->parent_id = $request->parent_id;
            $menu->type = 'custom';
            $menu->status = 2;
            $menu->created_by = Auth::id() ?? 1;
            $menu->created_at = date('Ymd H:i:s');

            $menu->save();
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Tai du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }
    }
    // form cập nhập
    function edit(string $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'Menu' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $menus = Menu::where('status', '!=', 0)
            ->select('id', 'name', 'sort_order')
            ->orderBy("created_at")
            ->get();
        $parent_id_html = '';
        foreach ($menus as $item) {
            if ($menu->parent_id == $item->id) {
                $parent_id_html .= '<option selected value=" ' . $item->id . '">' . $item->name . '</option>';
            } else {
                $parent_id_html .= '<option  value=" ' . $item->id . '">' . $item->name . '</option>';
            }
        }
        $sort_order_html = '';
        foreach ($menus as $item) {
            if ($menu->sort_order - 1 == $item->sort_order) {
                $sort_order_html .= '<option selected value=" ' . ($item->sort_order + 1) . '">sau: ' . $item->name . '</option>';
            } else {
                $sort_order_html .= '<option  value=" ' . ($item->sort_order + 1) . '">sau:' . $item->name . '</option>';
            }
        }
        $result = [
            'status' => false,
            'Menu' => $menu,
            'message' => 'Khong tim thay du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, string $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'Menu' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 200);
        }

        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->sort_order = $request->sort_order;
        $menu->parent_id = $request->parent_id;
        $menu->type = $request->type;
        $menu->table_id = 1;

        $menu->description = "sss";
        $menu->updated_at = date('Ymd H:i:s');
        $menu->updated_by = Auth::id() ?? 1;
        $menu->status = $request->status;

        $menu->save();
        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => 'Cap nhat du lieu thanh cong'
        ];
        return response()->json($result, 200);


        // If save fails
        // $result = [
        //     'status' => false,
        //     'menu' => null,
        //     'message' => 'Khoong the them du lieu'
        // ];
        // return response()->json($result, 200);
    }

    function destroy(string $id)
    {
        $menu = Menu::where([['id', '=', $id], ['status', '=', 0]])->first();
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $menu->delete();
        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => 'Xoa du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }
    function delete(Request $request, $id)
    {
        $brand = Menu::find($id);
        if ($brand == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $brand->status = $request->status;
        if ($brand->save()) {
            $result = [
                'status' => true,
                'menu' => $brand,
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
    public function restore(string $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $menu->status = 2;
        $menu->created_at = date('Ymd H:i:s');
        $menu->created_by = Auth::id() ?? 1;
        $menu->save();
        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => 'Cap nhat du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }

    function status($id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'menu' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $menu->status = ($menu->status == 1) ? 2 : 1;
        $menu->updated_at = date('Y-m-d H:i:s');
        $menu->created_by = Auth::id() ?? 1;
        $menu->save();
        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => 'tai du lieu thanh cong'
        ];
        return response()->json($result, 200);

        // If save fails
        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    public function menu_parentid($id)
    {
        $menus = Category::where([['status', '=', 1], ['parent_id', '=', $id]])
            ->orderBy('sort_order', 'asc')
            ->get();
        $result = [
            'status' => false,
            'menu' => $menus,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    public function thungrac()
    {
        $brand = Menu::where('status', '=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'link', 'type', 'position', 'status')
            ->get();
        $total = Menu::count();
        $resul = [
            'status' => true,
            'menu' => $brand,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
}
