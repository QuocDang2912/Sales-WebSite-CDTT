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
        Schema::create('evaluate', function (Blueprint $table) {
            $table->id(); //id
            $table->unsignedInteger('product_id');
            $table->enum('rate', ['lv1', 'lv2', 'lv3', 'lv4', 'lv5'])->default('lv5');
            $table->timestamps(); //created_at, updated_at
            $table->unsignedInteger('user_id')->default(1);
            $table->unsignedInteger('created_by')->default(1);
            $table->unsignedInteger('updated_by')->nullable();
            $table->unsignedTinyInteger('status')->default(2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluate');
    }
};
