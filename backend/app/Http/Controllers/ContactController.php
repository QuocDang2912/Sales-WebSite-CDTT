<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    //
    function index()
    {
        $contact = Contact::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name',  'title', 'email', 'phone', 'status')
            ->get();
        $total = Contact::count();
        $result = [
            'status' => true,
            'contact' => $contact,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $contact = Contact::find($id);

        if ($contact === null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $result = [
            'status' => true,
            'contact' => $contact,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $contact = new Contact();
        $contact->user_id = $request->user_id;
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->content = $request->content;
        $contact->replay_id = $request->replay_id;

        // end upload

        $contact->created_at = date('Y-m-d H:i:s');
        $contact->created_by = 1; //tam
        $contact->status = $request->status;

        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }
        // If save fails
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    function update(Request $request, $id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'Contact' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $contact->name = $request->name;
        $contact->user_id = $request->user_id;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->content = $request->content;
        $contact->replay_id = $request->replay_id;


        $contact->created_at = date('Y-m-d H:i:s');
        $contact->created_by = 1; //tam
        $contact->status = $request->status;

        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($contact->delete()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contac$contact' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $contact->status = ($contact->status == 1) ? 2 : 1;
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = 1; //tam
        if ($contact->save()) {
            $result = [
                'status' => true,
                'contac$contact' => $contact,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'contac$contact' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }



    //xoá

    function delete(Request $request, $id)
    {
        $Contact = Contact::find($id);
        if ($Contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $Contact->status = $request->status;
        if ($Contact->save()) {
            $result = [
                'status' => true,
                'contact' => $Contact,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $Contact = Contact::where('status', '=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'email', 'status', 'phone')
            ->get();
        $total = Contact::count();
        $resul = [
            'status' => true,
            'contact' => $Contact,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
}
