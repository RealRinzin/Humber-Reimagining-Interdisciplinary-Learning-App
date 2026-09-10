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
        // Schema::create('topics', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('title');
        //     $table->string('slug')->unique();
        //     $table->unsignedBigInteger('parent_id')->nullable(); // nullable = root items
        //     $table->foreign('parent_id')
        //         ->references('id')
        //         ->on('topics');
        //     $table->timestamps();
        // });

        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('node_group_id')
                ->constrained('node_groups')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('slug')->unique();
            $table->string('description');
            $table->string('node_color')->default('blue'); // 'blue' | 'pink'
            $table->integer('x_axis');
            $table->integer('y_axis');
            $table->string('video')->default(true);
            $table->string('code')->default(false);
            $table->string('interactive')->default(false);
            $table->string('rambling')->default(false);
            $table->string('quiz')->default(false);
            $table->boolean('student_visible')->default(true);
            $table->string('interactive_path')->default('space')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topics');
    }
};
