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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Add this line for the title column
            $table->string('slug')->unique(); // Add this line for the slug column
            // Foreign key to topics table
            $table->foreignId('topic_id')
            ->constrained('topics')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();   
            $table->unsignedBigInteger('parent_id')->nullable(); // nullable = root items
            $table->foreign('parent_id')
                ->references('id')
                ->on('videos');
            $table->string('thumbnail');// Add this line for the thumbnail column
            $table->string('video_url'); // Add this line for the video_url column
            $table->time('duration'); // Add this line for the duration column
            $table->text('description'); // Add this line for the description column
            // Timestamp
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
