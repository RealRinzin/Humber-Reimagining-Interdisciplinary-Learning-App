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
        Schema::create('lesson_documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('document_url');
            $table->foreignId('topic_id')
                ->constrained('topics')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('video_id')
                ->constrained('videos')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lesson_documents');
    }
};
