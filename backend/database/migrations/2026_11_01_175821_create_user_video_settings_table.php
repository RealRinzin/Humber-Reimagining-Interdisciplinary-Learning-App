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
        Schema::create('user_video_settings', function (Blueprint $table) {
            // We are creating a pivot table to represent the many-to-many relationship between users and topic nodes
            $table->id(); 
            $table->foreignId('user_id')
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            // Note: We are not using $table->id() here because we want to use a composite primary key
            $table->foreignId('video_id')
                ->constrained('videos')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            // For individual check 
            $table->boolean('code')->default(false);
            $table->boolean('interactive')->default(false);
            $table->boolean('rambling')->default(false);
            $table->boolean('quiz')->default(false);
            // For all complete check status fields
            $table->boolean('code_checked_with_all')->default(false);
            $table->boolean('interactive_checked_with_all')->default(false);
            $table->boolean('rambling_checked_with_all')->default(false);
            $table->boolean('quiz_checked_with_all')->default(false);
            $table->boolean('all_checked')->default(false);
            // Add timestamps for when the user followed the topic node
            $table->timestamps();
            // Set the primary key to be a combination of user_id and topic
            // $table->primary(['user_id', 'video_id']);
            // Add an index for faster lookups when querying by user_id and topic
            $table->unique(['user_id', 'video_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_video_settings');
    }
};
