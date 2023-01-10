<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        /*
        [attempt] fetch the right user from the db using its credentials and any extra fields, and then call the login method [login] do the actual work of creating the session and the setting the remember me token.

        so if you already have a user instance, you can skip attempt and directly call login

        this method add the user to Auth::user()
        */

        if (!Auth::attempt($request->only('email' ,'password')) ) {

            throw ValidationException::withMessages([
                'email' => 'wrong creds'
            ]);

        }

        $request->session()->regenerate();


        /**
         *! while using api token authentication (token based)
         * create Bearer Token in the database [personal_access_tokens]
         * sanctum createToken('name') to generate the token
         * plainTextToken prop  to retreive token
         */

        //? $token = Auth::user()->createToken('login-token')->plainTextToken ;

        /**
         *! while using SPA authentication (session based)
         * To authenticate your SPA, your SPA's "login" page should first make a request to the /sanctum/csrf-cookie
         * Laravel will set an XSRF-TOKEN cookie containing the current CSRF token
         */
        // Session()->regenerate();

        return response([
            'user' => Auth::user() 
        ]);

    }

    public function register(RegisterRequest $request)
    {
        /**
         * validated not validate  -- validate excepect 1 param
         * use validated because we use RegisterRequest request
         * Retrieve the validated input data...
         */
        $request -> validated();

        $user = User::create([
            'name' => $request->name ,
            'email' => $request->email ,
            'password' => Hash::make($request->password)
        ]);


        // fire event to SendEmailVerificationNotification
        // event(new Registered($user));

        // login with the registered user  ** required
        Auth::login($user);

        return response([
            'status' => 'successful' ,
            'statusCode' => 200 ,
            'message' => 'user registered successfully'
        ]);

    }

    public function user()
    {
        // this method protected with auth:sanctum middleware and need Bearer Token
        // Auth::user() -- only work with Bearer Token or create csrf
        return response(Auth::user());

    }



    public function logout(Request $request)
    {
        // with api auth
        // Auth::user()->currentAccessToken()->delete();

        // with spa auth
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();


    }

}
