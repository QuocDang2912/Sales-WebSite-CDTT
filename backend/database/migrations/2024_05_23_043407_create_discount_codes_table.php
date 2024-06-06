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
        if (!Schema::hasTable('discount_codes')) {
            Schema::create('discount_codes', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('title');
                $table->string('code');
                $table->unsignedInteger('percentage');
                $table->text('description')->nullable();
                $table->text('type')->nullable();
                $table->dateTime('expires_bd')->nullable();
                $table->dateTime('expires_kt')->nullable();
                $table->unsignedInteger('created_by')->default(1);
                $table->unsignedInteger('updated_by')->nullable();
                $table->unsignedTinyInteger('status')->default(1);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discount_codes');
    }
};
