<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use App\Models\Admin;
use Session;
use Hash;
use DB;

class AuthAdmin
{
    public function handle($request, Closure $next, $middleware) {   
        $token = Session('_token__') ? Session('_token__') : $request->cookie('_token__');
        if ($middleware == 'auth') {
            if ($token) {
                list($user_id, $token) = explode('$', $token, 2);
                $user = DB::table('manager')->where('id', '=', $user_id)->first();
                if ($user) {
                    $secret_key     = $user->secret_key;
                    if ($user->status) {
                        if (Hash::check($user_id . '$' . $secret_key, $token)) {

                            // permission
                            $sql = "SELECT manager_info.status as permission_status
                                    FROM manager_info
                                    WHERE manager_info.manager_id = ".$user_id;
                            if ($user->status == 2) {
                                return redirect()->route('admin.statistic.index');
                            }else{
                                $permission_data = DB::select($sql)[0]->permission_status;
                                if ($permission_data == 1) {
                                    return redirect()->route('admin.statistic.index');
                                }else{
                                    return redirect()->route('admin.waiter');
                                }
                            }
                        }else{
                            Cookie::queue(Cookie::forget('_token__'));
                            $request->session()->forget('_token__');
                            return redirect()->route('admin.login')->with('success', 'Token đã hết hạn');  
                        }
                    }else{
                        $request->session()->forget('_token__');
                        Cookie::queue(Cookie::forget('_token__'));
                        return redirect()->route('admin.login')->with('error', 'Tài khoản đã bị khóa!');  
                    }
                }else{
                    $request->session()->forget('_token__');
                    Cookie::queue(Cookie::forget('_token__'));
                    return redirect()->route('admin.login')->with('success', 'Tài khoản không tồn tại!');  
                }
            }else{
                return $next($request);
            }
        }else{
            if ($token) {
                list($user_id, $token) = explode('$', $token, 2);
                $user = DB::table('manager')->where('id', '=', $user_id)->first();
                if ($user->status) {
                    if ($user) {
                        $secret_key     = $user->secret_key;
                        if (Hash::check($user_id . '$' . $secret_key, $token)) {
                            // permission
                            $sql_status = "SELECT status as permission_status
                                            FROM manager_info
                                            WHERE manager_id = ".$user_id;
                            $sql_permission = "SELECT  permission.name as permission_name
                                                FROM manager_role
                                                LEFT JOIN role_permission
                                                ON role_permission.role_id = manager_role.role_id
                                                LEFT JOIN permission
                                                ON role_permission.permission_id = permission.id
                                                WHERE manager_role.manager_id = ".$user_id;

                            if ($user->status == 2) {
                                return $next($request);
                            }else{
                                $permission_data = DB::select($sql_status)[0]->permission_status;
                                if ($permission_data == 1) {
                                    if (static::checkRole(DB::select($sql_permission), $middleware)) {
                                        return $next($request);
                                    }else{
                                        return response('Unauthenticated.', 401);
                                    }
                                }else{
                                    if ($middleware != "waiter") {
                                        return response('Unauthenticated.', 401);
                                    }else{
                                        return $next($request);
                                    }
                                }
                            }
                        }else{
                            Cookie::queue(Cookie::forget('_token__'));
                            $request->session()->forget('_token__');
                            return  redirect()->route('admin.login')->with('success', 'Token đã hết hạn');  
                        }
                    }else{
                        $request->session()->forget('_token__');
                        Cookie::queue(Cookie::forget('_token__'));
                        return redirect()->route('admin.login')->with('success', 'Tài khoản không tồn tại!');  
                    }
                }else{
                    $request->session()->forget('_token__');
                    Cookie::queue(Cookie::forget('_token__'));
                    return redirect()->route('admin.login')->with('error', 'Tài khoản đã bị khóa!');  
                }
            }else{
                return redirect()->route('admin.login')->with('success', 'Bạn cần đăng nhập để thực hiện hành động này');  
            }
        }
    }
    public function checkRole($data, $middleware){
        foreach ($data as $key => $value) {
            if ($value->permission_name == $middleware) {
                return true;
            }
        }
        return false;
    }
}
