<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\PermissionRepository;
use App\Models\Permission;
use App\Models\RolePermission;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class PermissionController extends Controller
{
    protected $permission;
    protected $role_permission;

    public function __construct(Permission $permission, RolePermission $role_permission){
        $this->permission             = new PermissionRepository($permission);
        $this->role_permission        = new PermissionRepository($role_permission);
    }
    public function index(){
        return view('admin.manager.permission');
    }
    public function get(){
        $data = $this->permission->get_product();
        return $this->permission->send_response(201, $data, null);
    }
}
