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
        Schema::create('user_topics', function (Blueprint $table) {
            // We are creating a pivot table to represent the many-to-many relationship between users and topic nodes
            $table->foreignId('user_id')
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            // Note: We are not using $table->id() here because we want to use a composite primary key
            $table->foreignId('topic_node_id')
                ->constrained('topic_nodes')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            // Add timestamps for when the user followed the topic node
            $table->timestamps();
            // Set the primary key to be a combination of user_id and topic_node_id
            $table->primary(['user_id', 'topic_node_id']);
            // Add an index for faster lookups when querying by user_id and topic_node_id
            $table->index(['user_id', 'topic_node_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_topics');
    }
};
