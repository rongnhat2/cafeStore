<?php

namespace App\Repositories\Manager;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;
use App\Repositories\RepositoryInterface;
use Session;
use Hash;
use DB;

class RoleRepository extends BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct(Model $model){
        $this->model = $model;
    }

    public function get_product(){
        $sql = "SELECT  role.*
                FROM role";
        return DB::select($sql);
    }
    public function get_one($id){
        $sql = "SELECT * FROM role WHERE id = ".$id;
        return DB::select($sql);
    }
    public function get_one_permission($id){
        $sql = "SELECT * FROM role_permission WHERE role_id = ".$id;
        return DB::select($sql);
    }
    public function remove_permission($id){
        $sql = "DELETE FROM role_permission WHERE role_id = ".$id;
        return DB::select($sql);
    }
    

}
