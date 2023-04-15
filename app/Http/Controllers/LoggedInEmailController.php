<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoggedInEmailController extends Controller
{
    public function getLoggedInEmail()
{
    // Assuming you have implemented authentication in your application
    // You can access the logged-in user's email using the `user()` method
    $loggedInEmail = auth()->user()->email;
    
    // Return the logged-in email as a JSON response
    return response()->json(['email' => $loggedInEmail]);
}

}
