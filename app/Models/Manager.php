<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manager extends Model
{
    use HasFactory;
    protected $table = 'manager';
    protected $fillable = ['secret_key', 'email', 'password', 'status', 'created_at', 'updated_at'];
}
