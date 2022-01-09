<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DisplayController extends Controller
{
    public function login(){
        return view('admin.auth.login');
    }
    public function statistic(){
        return view('admin.manager.statistic');
    }
}
