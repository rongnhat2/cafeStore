<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderTime extends Model
{
    use HasFactory;
    protected $table = 'order_time';
    protected $fillable = ['manager_id', 'table_id', 'total_prices', 'status', 'created_at', 'updated_at'];
}
