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
        Schema::create('flash_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')
            ->constrained('videos')
            ->onUpdate('cascade')
            ->onDelete('cascade');
        $table->foreignId('topic_node_id')
            ->constrained('topic_nodes')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string("type");
            $table->string("difficulty");
            $table->string("question");
            $table->string("answer");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flash_cards');
    }
};
