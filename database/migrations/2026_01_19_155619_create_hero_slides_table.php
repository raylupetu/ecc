<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('title_fr')->nullable();
            $table->string('title_en')->nullable();
            $table->string('subtitle_fr')->nullable();
            $table->string('subtitle_en')->nullable();
            $table->string('button_text_fr')->nullable();
            $table->string('button_text_en')->nullable();
            $table->string('button_url')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
