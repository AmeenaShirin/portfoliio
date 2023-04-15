<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserRegisterController;
use App\Http\Controllers\UserLoginController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\ApplyController;
use App\Http\Controllers\SalaryController;

Route::get('/salary',[App\Http\Controllers\SalaryController::class, 'index']);
Route::post('/testt',[App\Http\Controllers\SalaryController::class, 'store']);
Route::post('/salary', [SalaryController::class, 'store']);
Route::put('/salary/{id}', [SalaryController::class, 'update']);
Route::delete('/salary/{id}', [SalaryController::class, 'destroy']);

Route::get('/apply',[App\Http\Controllers\ApplyController::class, 'index']);
Route::post('/test',[App\Http\Controllers\ApplyController::class, 'store']);
Route::post('/apply', [ApplyController::class, 'store']);
Route::put('/apply/{id}', [ApplyController::class, 'update']);
Route::delete('/apply/{id}', [ApplyController::class, 'destroy']);


Route::get('/work',[App\Http\Controllers\WorkController::class, 'index']);
Route::post('/savve',[App\Http\Controllers\WorkController::class, 'store']);
Route::post('/work', [WorkController::class, 'store']);
Route::put('/work/{id}', [WorkController::class, 'update']);
Route::delete('/work/{id}', [WorkController::class, 'destroy']);




Route::get('/leave',[App\Http\Controllers\LeaveController::class, 'index']);
Route::post('/sett',[App\Http\Controllers\LeaveController::class, 'store']);
Route::post('/leave', [LeaveController::class, 'store']);
Route::put('/leave/{id}', [LeaveController::class, 'update']);
Route::delete('/leave/{id}', [LeaveController::class, 'destroy']);

Route::get('/department',[App\Http\Controllers\DepartmentController::class, 'index']);
Route::post('/set',[App\Http\Controllers\DepartmentController::class, 'store']);
Route::post('/department', [DepartmentController::class, 'store']);
Route::put('/department/{id}', [DepartmentController::class, 'update']);
Route::delete('/department/{id}', [DepartmentController::class, 'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [RegisterController::class, 'store']);
Route::post('/resetpassword', 'App\Http\Controllers\AuthController@resetPassword');
Route::post('/userregister', [UserRegisterController::class, 'store']);
Route::post('/userresetpassword', 'App\Http\Controllers\AuthController@resetPassword');



Route::post('/userlogin', [UserLoginController::class, 'check']);
Route::post('/userlogout', [UserLoginController::class, 'logout']);
Route::post('/login', [LoginController::class, 'check']);
Route::post('/logout', [LoginController::class, 'logout']);
Route::middleware('auth.react')->get('/dashboard', function () {
    return response()->json(['message' => 'You are authenticated.']);
});