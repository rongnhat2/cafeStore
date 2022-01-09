<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Time extends Model
{
    use HasFactory;
    protected $table = 'time_data';
    protected $fillable = ['staff_id', 'date_data', 'created_at', 'updated_at'];
}
