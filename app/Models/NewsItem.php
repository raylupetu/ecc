<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsItem extends Model
{
    protected $fillable = [
        'title_fr',
        'title_en',
        'content_fr',
        'content_en',
        'image',
        'published_at'
    ];
}
