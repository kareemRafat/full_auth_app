<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->group(function(){
    // public routes
    Route::post('/login' , 'login');
    Route::post('/register','register');
    Route::post('/logout' , 'logout');

    // protected routes
    Route::middleware('auth:sanctum')->group(function(){
        Route::get('/user' , 'user');
    });
});


