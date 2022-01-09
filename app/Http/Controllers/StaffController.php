<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\StaffRepository;
use App\Models\Manager;
use App\Models\ManagerInfo;
use App\Models\ManagerRole;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class StaffController extends Controller
{
    protected $manager;
    protected $manager_info;
    protected $manager_role;

    public function __construct(Manager $manager, ManagerInfo $manager_info, ManagerRole $manager_role){
        $this->manager             = new StaffRepository($manager);
        $this->manager_info        = new StaffRepository($manager_info);
        $this->manager_role        = new StaffRepository($manager_role);
    }
    public function index(){
        return view('admin.manager.staff');
    }
    public function get(){
        $data = $this->manager->get_product();
        return $this->manager->send_response(201, $data, null);
    }
    public function get_waiter(){
        $data = $this->manager->get_waiter();
        return $this->manager->send_response(201, $data, null);
    }
    public function get_one($id){
        $data = $this->manager->get_one($id);
        return $this->manager->send_response(200, $data, null);
    }
    public function store(Request $request){
        
        $secret_key     = $this->manager->generateSecretKey();
        $data = [
            'secret_key'     =>  $secret_key,
            "email"          => $request->data_email,
            'password'       =>  Hash::make($request->data_password),
            "status"         => "1",
        ];
        $data_manager = $this->manager->create($data);

        $data_info = [
            'manager_id'    => $data_manager->id,
            'name'          => $request->data_name,
            'telephone'     => $request->data_telephone,
            'address'       => $request->data_address,
            'code'          => $request->data_code, 
            "status"        => $request->data_permission, 
        ];
        $data_info_create = $this->manager_info->create($data_info);

        $data_role = [
            'manager_id'     => $data_manager->id,
            "role_id"        => $request->data_role,
        ];
        $data_role_create = $this->manager_role->create($data_role);
        return $this->manager->send_response(201, $data_manager, null);
    }
    public function update(Request $request){
        $id                 = $request->data_id;
        
        $data_info = [
            'name'          => $request->data_name,
            'telephone'     => $request->data_telephone,
            'address'       => $request->data_address,
            'code'          => $request->data_code, 
            "status"        => $request->data_permission, 
        ];
        $this->manager_info->update($data_info, $id);

        $this->manager_info->remove_role($request->manager_id);
        $data_role = [
            'manager_id'     => $request->manager_id,
            "role_id"        => $request->data_role,
        ];
        $this->manager_role->create($data_role);
        return $this->manager->send_response(201, "success", null);
    }
    public function delete($id){
        $data = $this->manager->delete($id);
        $this->manager_info->remove_info($id);
        $this->manager_role->remove_role($id);
        return $this->manager->send_response(200, "Delete successful", null);
    }



}
