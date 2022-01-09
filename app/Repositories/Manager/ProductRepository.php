<?php

namespace App\Repositories\Manager;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;
use App\Repositories\RepositoryInterface;
use Session;
use Hash;
use DB;

class ProductRepository extends BaseRepository implements RepositoryInterface
{
    protected $model;

    public function __construct(Model $model){
        $this->model = $model;
    }

    public function get_product(){
        $sql = "SELECT * FROM product";
        return DB::select($sql);
    }
    public function get_one($id){
        $sql = "SELECT * FROM product WHERE id = ".$id;
        return DB::select($sql);
    }
    
}
