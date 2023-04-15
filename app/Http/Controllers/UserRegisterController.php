<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Hash;
use DB;

class UserRegisterController extends Controller
{
    public function store(Request $request)
    {
       $input = $request->all();
       
       // Check if the email entered by the user already exists in the employee table
       $work = DB::table('work')->where('email', $input['email'])->first();
       if (!$work) {
           return response()->json([
                'status' => false,
                'message' => "Email is not registered as an employee"
           ]);
       }

       User::create([
        'name' => $input['name'],
        'email' => $input['email'],
        'password' => Hash::make($input['password'])
      ]);

      return response()->json([
                'status' => true,
                'message' => "Registration Success"
            ]);
    }  
}

