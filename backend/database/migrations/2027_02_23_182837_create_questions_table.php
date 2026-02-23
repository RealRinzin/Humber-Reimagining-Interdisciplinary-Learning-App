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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id') // Add this line for the quiz_id foreign key
                ->constrained('quizzes') 
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('question');// Add this line for the question column
            $table->boolean('is_correct'); // Add this line for the is_correct column
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
