<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleManager extends Model
{
    use HasFactory;
    protected $table = 'manager_role';
    protected $fillable = ['manager_id', 'role_id', 'created_at', 'updated_at'];
}
