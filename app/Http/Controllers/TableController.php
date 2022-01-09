<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\TableRepository;
use App\Models\Table;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class TableController extends Controller
{
    protected $table;

    public function __construct(Table $table ){
        $this->table             = new TableRepository($table); 
    }
    public function index(){
        return view('admin.manager.table');
    }
    public function get(){
        $data = $this->table->get_table();
        return $this->table->send_response(201, $data, null);
    }
    public function store(Request $request){
        $data_create = [
            "name" => $request->data_name,
            "size" => $request->data_size,
        ];
        $this->table->create($data_create);
        return $this->table->send_response(201, $data_create, null);
    }
    public function delete($id){
        $data = $this->table->delete($id);
        return $this->table->send_response(200, "Delete successful", null);
    }
}
