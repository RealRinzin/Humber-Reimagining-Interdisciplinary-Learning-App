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
        Schema::create('video_watch_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id') // Foreign key referencing the users table
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('video_id') // Foreign key referencing the topics table
                ->constrained('videos')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->time('started_at'); // Timestamp of when the user started watching the topic
            $table->string('interaction_type');
            $table->time('ended_at')->nullable(); // Timestamp of when the user stopped watching the topic
            $table->time('watch_duration')->nullable(); //  Total time spent watching the topic
            $table->time('last_paused')->nullable();  // Timestamp of the last pause action
            $table->integer('pause_count')->default(0); // Number of times the user paused the topic
            $table->string('device_type')->nullable(); // Type of device used (e.g., mobile, desktop)
            $table->string('complete_status'); // Status of the topic (e.g., 'completed', 'in_progress', 'not_started')
            $table->date('played_date');    // Date when the topic was played
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_watch_histories');
    }
};
