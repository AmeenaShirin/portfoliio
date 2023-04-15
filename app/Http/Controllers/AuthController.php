<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

class AuthController extends Controller
{
    public function resetPassword(Request $request)
{
    $email = $request->input('email');
    $newPassword = $request->input('new_password');

    // Find the user by email
    $user = User::where('email', $email)->first();

    if (!$user) {
        // If user not found, return an error response
        return response()->json(['error' => 'User not found'], 404);
    }

    // Update the user's password
    $user->password = bcrypt($newPassword);
    $user->save();

    // Return a success response
    return response()->json(['message' => 'Password reset successfully'], 200);
}
public function userresetPassword(Request $request)
{
    $email = $request->input('email');
    $newPassword = $request->input('new_password');

    // Find the user by email
    $user = User::where('email', $email)->first();

    if (!$user) {
        // If user not found, return an error response
        return response()->json(['error' => 'User not found'], 404);
    }

    // Update the user's password
    $user->password = bcrypt($newPassword);
    $user->save();

    // Return a success response
    return response()->json(['message' => 'Password reset successfully'], 200);
}
    
}