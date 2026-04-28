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
        Schema::create('user_video_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_video_id')
                ->constrained('user_videos')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            // Fix: enum instead of free varchar
            $table->enum('interaction_type', ['Played', 'Paused', 'Seeked', 'Completed', 'Buffering', 'RateChange', 'Volume', 'Progress','Close']);
            // Fix: timestamp instead of varchar
            $table->unsignedInteger('interact_at');
            // Device info
            $table->string('device_type')->nullable();
            $table->string('os_type')->nullable();
            $table->string('browser_type')->nullable();
            $table->string('user_agent')->nullable(); // raw UA string for future re-parsing

            // Network
            $table->ipAddress('ip_address')->nullable(); // Laravel's built-in ipAddress() handles IPv4 + IPv6
            // Engagement metrics
            // $table->unsignedInteger('watch_duration_seconds')->nullable();
            // $table->unsignedInteger('video_position_seconds')->nullable();
            // $table->unsignedTinyInteger('completion_percentage')->nullable(); // 0-100
            $table->date('played_on');    // Date when the topic was played
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_video_analytics');
    }
};
