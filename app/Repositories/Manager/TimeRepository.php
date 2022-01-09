<?php

namespace App\Repositories\Manager;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;
use App\Repositories\RepositoryInterface;
use Session;
use Hash;
use DB;

class TimeRepository extends BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct(Model $model){
        $this->model = $model;
    }
    public function get_product(){
        $sql = "SELECT * FROM time_data ";
        return DB::select($sql);
    }
    public function remove_time($time){
        $sql = "DELETE FROM time_data WHERE date_data = '".$time."'";
        return DB::select($sql);
    }
    
}
