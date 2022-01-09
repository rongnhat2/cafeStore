<?php

namespace App\Repositories\Manager;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;
use App\Repositories\RepositoryInterface;
use Session;
use Hash;
use DB;

class TableRepository extends BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct(Model $model){
        $this->model = $model;
    }

    public function get_table(){
        $sql = "SELECT table_position.*
                FROM table_position";
        return DB::select($sql);
    }
                // order_time.total_prices
                // LEFT JOIN order_time
                // ON order_time.table_id = table_position.id
                // WHERE order_time.status = 0
    public function get_product(){
        $sql = "SELECT * FROM product ";
        return DB::select($sql);
    }
    public function get_one($id){
        $sql = "SELECT * 
                FROM order_time 
                WHERE status = 0 AND table_id = ".$id;
        $data["table"] = DB::select($sql);
        $data["order"] = null;
        if (count($data["table"]) != 0) {
            $sql_order = "SELECT * 
                FROM sub_order 
                WHERE order_id = ".$data["table"][0]->id;
            $data["order"] = DB::select($sql_order);
        }
        return $data;
    }

    
}
