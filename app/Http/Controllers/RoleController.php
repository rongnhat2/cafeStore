<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\RoleRepository;
use App\Models\Role;
use App\Models\RolePermission;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class RoleController extends Controller
{
    protected $role;
    protected $role_permission;

    public function __construct(Role $role, RolePermission $role_permission){
        $this->role             = new RoleRepository($role);
        $this->role_permission  = new RoleRepository($role_permission);
    }
    public function get(){
        $data = $this->role->get_product();
        return $this->role->send_response(200, $data, null);
    }
    public function get_one($id){
        $data["role"] = $this->role->get_one($id);
        $data["permission"] = $this->role->get_one_permission($id);
        return $this->role->send_response(200, $data, null);
    }
    public function store(Request $request){

        $permission_new = $this->role->create([ "name" => $request->data_name ]);

        // create role ~ permission
        $permission_list = explode(" | ", $request->data_permission);
        foreach ($permission_list as $key => $value) {
            $this->role_permission->create(["role_id" => $permission_new->id, "permission_id" => $value]);
        }

        return $this->role->send_response(201, null, null);
    }
    public function update(Request $request){
        $id                 = $request->data_id;
        
        $data_update   = [
            "name"        => $request->data_name,
        ];
        $this->role->update($data_update, $id);

        // remove role ~ permission
        $this->role_permission->remove_permission($id);

        // create role ~ permission
        $permission_list = explode(" | ", $request->data_permission);
        foreach ($permission_list as $key => $value) {
            $this->role_permission->create(["role_id" => $id, "permission_id" => $value]);
        }

        return $this->role_permission->send_response(200, null, null);
    }
    public function delete($id){
        $this->role_permission->remove_permission($id);
        $data = $this->role->delete($id);
        return $this->role->send_response(200, "Delete successful", null);
    }
}
