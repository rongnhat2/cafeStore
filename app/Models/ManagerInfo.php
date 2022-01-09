<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagerInfo extends Model
{
    use HasFactory;
    protected $table = 'manager_info';
    protected $fillable = ['manager_id', 'name', 'telephone', 'address', 'code', 'status', 'created_at', 'updated_at'];
}
