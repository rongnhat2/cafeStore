<?php

namespace App\Repositories\Manager;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;
use App\Repositories\RepositoryInterface;
use Session;
use Hash;
use DB;

class OrderRepository extends BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct(Model $model){
        $this->model = $model;
    }
    
    public function update_empty($id){
        $sql = "UPDATE order_time
                SET status = 1
                WHERE table_id = ".$id;
        return DB::select($sql);
    }
    
}
