<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'role_fr',
        'role_en',
        'image',
        'email',
        'phone',
        'bio_fr',
        'bio_en',
        'order'
    ];
}
