<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'title',
        'title_fr',
        'title_en',
        'image',
        'category',
        'is_active',
    ];

    protected $appends = ['title'];

    public function getTitleAttribute()
    {
        $locale = app()->getLocale();
        return $locale === 'en' ? ($this->title_en ?: $this->title_fr) : ($this->title_fr ?: $this->title_en);
    }
}
