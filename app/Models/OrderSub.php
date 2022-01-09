<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderSub extends Model
{
    use HasFactory;
    protected $table = 'sub_order';
    protected $fillable = ['order_id', 'product_id', 'quantity', 'status', 'created_at', 'updated_at'];
}
