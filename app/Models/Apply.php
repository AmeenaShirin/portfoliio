<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apply extends Model
{
    protected $table = 'apply';
    protected $primaryKey = 'id';
    protected $fillable = ['leaveName', 'startDate', 'endDate', 'description','status'];
    protected $dates = ['startDate', 'endDate'];
}
