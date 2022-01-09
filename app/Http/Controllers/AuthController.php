<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\ManagerRepository;
use App\Models\Manager;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class AuthController extends Controller
{
    protected $manager;

    public function __construct(Manager $manager){
        $this->manager        = new ManagerRepository($manager);
    }

    public function login(Request $request){
        $manager_id     = $this->manager->checkEmailPassword($request);
        if ($manager_id) {
            $name_cookie = Cookie::queue('_token__', $this->manager->createTokenClient($manager_id), 2628000);
            return redirect()->back()->with('success', 'Đăng nhập thành công');  
        }else{
            return redirect()->back()->with('error', 'Tên tài khoản hoặc mật khẩu không chính xác'); 
        }

    }
    public function register(){
        // Contact to update Function
    }
    public function logout(){
        Cookie::queue(Cookie::forget('_token__'));
        return redirect()->route('admin.login')->with('success', 'Đăng xuất thành công');  
    }
}
