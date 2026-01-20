<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'image',
        'title_fr',
        'title_en',
        'subtitle_fr',
        'subtitle_en',
        'button_text_fr',
        'button_text_en',
        'button_url',
        'order'
    ];
}
