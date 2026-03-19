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
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_node_id')
                ->unique()
                ->constrained('topic_nodes')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('video_id')
                ->constrained('videos')
                ->onUpdate('cascade')
                ->onDelete('cascade');
                $table->string('Question');
                $table->string('description');
            // $table->foreignId('user_id')
            //     ->constrained('users')
            //     ->onUpdate('cascade')
            //     ->onDelete('cascade');
            $table->time('time_limit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
