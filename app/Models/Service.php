<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title_fr',
        'title_en',
        'description_fr',
        'description_en',
        'image',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
