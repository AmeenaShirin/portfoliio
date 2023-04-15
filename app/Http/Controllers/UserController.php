<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserDetails($email)
    {
        $user = DB::table('work')
            ->where('email', $email)
            ->first();
    
        return response()->json([
            'firstName' => $user->firstName,
            'lastName' => $user->lastName,
        ]);
    }
    
}
