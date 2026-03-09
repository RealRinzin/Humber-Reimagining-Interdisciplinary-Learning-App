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
        Schema::create('user_video_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('video_id') // Foreign key referencing the topics table
                ->constrained('videos')
                ->onUpdate('cascade')
                ->onDelete('cascade');
                // Check or unchecked status
            $table->boolean('tldnw','false');
            $table->boolean('code','false');
            $table->boolean('test_your_knowledge','false');
            $table->boolean('umer_rambling','false');
            $table->boolean('resources','false');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_video_progress');
    }
};
