<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;
    protected $table = 'table_position';
    protected $fillable = ['name', 'size', 'status', 'created_at', 'updated_at'];
}
