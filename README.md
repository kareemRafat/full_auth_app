# full_auth_app

# Laravel – Vue Authentication system – Backend – Frontend

# Backend

### 1 – install Laravel application

### 2 – install Laravel Sanctum #SPA Authentication

### 3 – Configure Cors Policies :

```php
A - We must make both back and front end in the same domain http://localhost
The front >> http://localhost:5173
The back >> http://localhost:8000
In order to authenticate, your SPA and API must share the same top-level domain. However, they may be placed on different subdomains. Additionally, you should ensure that you send the Accept: application/json header with your request.
To default it with all requests in axios ( in src/main.js )
axios.defaults.headers.common["Accept"] = "application/json";
```

```php
B - You should ensure that your application's CORS configuration is returning the Access-Control-Allow-Credentials header with a value of True. This may be accomplished by setting the supports_credentials option within your application's config/cors.php configuration file to true.
```

```php
C – you should allow the credentials option in the front request to
In Axios :  axios.defaults.withCredentials = true;  ( make default Axios )
In Fetch :  Credentials = true
```

### 4 - Sanctum Middleware

```php
A - Make sure to uncomment the next middleware at app/Http/Kernel.php
In $middlewareGroup  'api'=>
\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
```

```php
B – add  In $middleware   ( not mentioned in the documentation !!!  )
\\Illuminate\Session\Middleware\StartSession::class
```

5 – Authentication and csrf protection :
To authenticate your SPA, your SPA's "login" page should first make a request to the /sanctum/csrf-cookie endpoint to initialize CSRF protection for the application.
I make a method call csrfCookie() in src/composable/csrfCookie.js and return a promise from it .
When login or register since your application already made a request to the /sanctum/csrf-cookie route, subsequent requests should automatically receive CSRF protection as long as your JavaScript HTTP client sends the value of the XSRF-TOKEN cookie in the X-XSRF-TOKEN header.

### 6 – protecting Routes

To protect a route with sanctum use :
Route::middleware('auth:sanctum')
