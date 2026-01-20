<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BibleVerse extends Model
{
    protected $fillable = [
        'text_fr',
        'text_en',
        'reference_fr',
        'reference_en',
        'order'
    ];
}
