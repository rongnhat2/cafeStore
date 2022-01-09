<?php

namespace App\Repositories\Manager;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;
use App\Repositories\RepositoryInterface;
use Session;
use Hash;
use DB;

class StaffRepository extends BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct(Model $model){
        $this->model = $model;
    }

    public function get_product(){
        $sql = "SELECT manager.*,
                        manager_info.name,
                        manager_info.telephone,
                        manager_info.address,
                        manager_info.code,
                        manager_info.status as permission_status,
                        role.name as role_name
                    FROM manager
                    LEFT JOIN manager_info
                    ON manager_info.manager_id = manager.id
                    LEFT JOIN manager_role
                    ON manager_role.manager_id = manager.id
                    LEFT JOIN role
                    ON manager_role.role_id = role.id";
        return DB::select($sql);
    }
    public function get_waiter(){
        $sql = "SELECT manager.*,
                        manager_info.name,
                        manager_info.telephone,
                        manager_info.address,
                        manager_info.code,
                        manager_info.status as permission_status,
                        role.name as role_name
                    FROM manager
                    LEFT JOIN manager_info
                    ON manager_info.manager_id = manager.id
                    LEFT JOIN manager_role
                    ON manager_role.manager_id = manager.id
                    LEFT JOIN role
                    ON manager_role.role_id = role.id 
                    WHERE manager_info.status = 0";
        return DB::select($sql);
    }

    public function get_one($id){
        $sql = "SELECT  manager.*,
                        manager_info.id as info_id,
                        manager_info.name,
                        manager_info.telephone,
                        manager_info.address,
                        manager_info.code,
                        manager_info.status as permission_status,
                        manager_role.role_id as role_id,
                        role.name as role_name
                    FROM manager
                    LEFT JOIN manager_info
                    ON manager_info.manager_id = manager.id
                    LEFT JOIN manager_role
                    ON manager_role.manager_id = manager.id
                    LEFT JOIN role
                    ON manager_role.role_id = role.id
                    WHERE manager.id = ".$id;
        return DB::select($sql);
    }

    public function remove_info($id){
        $sql = "DELETE FROM manager_info WHERE manager_id = ".$id;
        return DB::select($sql);
    }
    public function remove_role($id){
        $sql = "DELETE FROM manager_role WHERE manager_id = ".$id;
        return DB::select($sql);
    }
    
}
