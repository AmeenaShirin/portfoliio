<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salary extends Model
{ 
    protected $table = 'salary';
    protected $primaryKey = 'id';
    protected $fillable = ['department', 'name', 'salary1', 'allowanceSalary','total'];
    use HasFactory;
}
