<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use App\Repositories\Manager\TimeRepository;
use App\Models\Time;
use Carbon\Carbon;
use Session;
use Hash;
use DB;

class TimeController extends Controller
{
    protected $time;

    public function __construct(Time $time ){
        $this->time             = new TimeRepository($time); 
    }
    public function index(){
        return view('admin.manager.time');
    }
    public function get(){
        $data = $this->time->get_product();
        return $this->time->send_response(201, $data, null);
    }
    public function store(Request $request){
        $this->time->remove_time($request->day_select);
        $data_create = [
            "staff_id" => $request->calendar,
            "date_data" => $request->day_select,
        ];
        $this->time->create($data_create);
        return $this->time->send_response(201, $data_create, null);
    }

}
