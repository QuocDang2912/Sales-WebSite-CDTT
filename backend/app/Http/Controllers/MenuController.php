<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    //
    function index()
    {
        $menu = Menu::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'link', 'type', 'table_id', 'status')
            ->get();
        $total = Menu::count();
        $result = [
            'status' => true,
            'menu' => $menu,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
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
        $menu = new Menu();
        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->sort_order = $request->sort_order;
        $menu->parent_id = $request->parent_id;
        $menu->type = $request->type;
        $menu->table_id = $request->table_id;
        $menu->description = $request->description;

        $menu->created_at = date('Y-m-d H:i:s');
        $menu->created_by = 1; //tam
        $menu->status = $request->status;

        if ($menu->save()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    function update(Request $request, $id)
    {
        $menu = Menu::find($id);
        if ($menu == null) {
            $result = [
                'status' => false,
                'Menu' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->sort_order = $request->sort_order;
        $menu->parent_id = $request->parent_id;
        $menu->type = $request->type;
        $menu->table_id = $request->table_id;

        $menu->description = $request->description;
        $menu->created_at = date('Y-m-d H:i:s');
        $menu->created_by = 1; //tam
        $menu->status = $request->status;

        if ($menu->save()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'menu' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
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

        if ($menu->delete()) {
            $result = [
                'status' => true,
                'menu' => $menu,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
}
