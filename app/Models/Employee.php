<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $table = 'employees';
    protected $primaryKey = 'id';
    protected $fillable = [
        'employeeId',
        'firstName',
        'lastName',
        'email',
        'department',
        'mobile',
        'country',
        'state',
        'city',
        'address',
    ];
    use HasFactory;
}
