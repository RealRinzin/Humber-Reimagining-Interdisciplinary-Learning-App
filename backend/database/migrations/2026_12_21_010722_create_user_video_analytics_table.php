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
            $table->foreignId('user_video_id') // Foreign key referencing the users table
                ->constrained('user_videos')
                ->onUpdate('cascade')
                ->onDelete('cascade');
                $table->string('interaction_type');
                $table->string('interact_at');
                $table->string('device_type');
            $table->string('os_type');
            $table->string('browser_type');
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
