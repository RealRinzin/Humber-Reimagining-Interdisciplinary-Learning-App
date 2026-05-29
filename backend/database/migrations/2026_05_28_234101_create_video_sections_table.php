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
        Schema::create('video_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')
                ->constrained('videos')
                ->onDelete('cascade');
            $table->string('title');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable(); // Add this line for the thumbnail column
            $table->string('video_url'); // Add this line for the video_url column
            $table->integer('duration')->nullable(); // Add this line for the duration column
            $table->string('interactive_path')->nullable();
            $table->string('subtitle')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_sections');
    }
};
