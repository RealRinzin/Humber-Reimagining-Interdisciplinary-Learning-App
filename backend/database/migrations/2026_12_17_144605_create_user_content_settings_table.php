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
        Schema::create('user_content_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->unique()        // <-- add this
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            // Content Selection
            $table->boolean('video')->default(false);
            $table->boolean('code')->default(false);
            $table->boolean('quiz')->default(false);
            $table->boolean('interactive')->default(false);
            $table->boolean('rambling')->default(false);
            // Learning Path
            $table->boolean('explore_mode')->default(false);
            $table->boolean('guide_path')->default(false);
            // Progress show
            $table->boolean('progress')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_content_settings');
    }
};
