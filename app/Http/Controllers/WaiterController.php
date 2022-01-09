<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\TableRepository;
use App\Repositories\Manager\OrderRepository;
use App\Models\Table;
use App\Models\OrderTime;
use App\Models\OrderSub;

use Carbon\Carbon;
use Session;
use Hash;
use DB;

class WaiterController extends Controller
{
    protected $table;
    protected $order_time;
    protected $order_sub;

    public function __construct(Table $table, OrderTime $order_time, OrderSub $order_sub ){
        $this->table             = new TableRepository($table); 
        $this->order_time        = new OrderRepository($order_time); 
        $this->order_sub         = new OrderRepository($order_sub); 
    }
    public function index(){
        return view('admin.manager.waiter');
    }
    public function get_table(){
        $data = $this->table->get_table();
        return $this->table->send_response(201, $data, null);
    }
    public function get_product(){
        $data = $this->table->get_product();
        return $this->table->send_response(201, $data, null);
    }

    public function get_one($id){
        $data = $this->table->get_one($id);
        return $this->table->send_response(201, $data, null);
    }
    public function store(Request $request){
        list($user_id, $token) = explode('$', $request->data_manager_id, 2);
        $data_create = [
            "manager_id"        => $user_id,
            "table_id"          => $request->data_id,
            "total_prices"      => $request->data_prices,
            "status"            => 0,
        ];
        $order_new = $this->order_time->create($data_create);
        foreach (explode(' | ', $request->data_items) as $key => $value) {
            $data_sub = explode('~', $value);
            $this->order_sub->create(["product_id" => $order_new->id, "order_id" => $data_sub[0], "quantity" => $data_sub[1]] );
        };
        $this->table->update(["status" => 0], $request->data_id);

        return $this->table->send_response(201, $order_new, null);
    }
    public function update(Request $request){
        $this->order_time->update_empty($request->data_id);
        $this->table->update(["status" => 1], $request->data_id);
        return $this->table->send_response(201, null, null);
    }



}
