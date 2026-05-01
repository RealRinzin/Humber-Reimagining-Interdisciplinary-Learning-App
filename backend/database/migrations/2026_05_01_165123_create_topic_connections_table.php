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
        Schema::create('topic_connections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('topic_id')->constrained('topics')->cascadeOnDelete();
            $table->foreignId('connected_topic_id')->constrained('topics')->cascadeOnDelete();
            $table->string('line_style')->default('d'); // 'd' = dashed, 's' = solid
            $table->unique(['topic_id', 'connected_topic_id']); // no duplicate edges
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topic_connections');
    }
};
