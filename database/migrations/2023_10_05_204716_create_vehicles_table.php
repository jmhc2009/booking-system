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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('transport_company_id')->nullable();
            $table->string('number',15);
            $table->enum('type',['van','suv','automovil']);
            $table->string('brand',60);
            $table->string('model',60);
            $table->string('patent',10);
            $table->string('year',10);
            $table->string('tecnical_revision_year',10);
            $table->string('seat_insurance',45);
            $table->string('driver_insurance',45);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('transport_company_id')->references('id')->on('transport_companies')->onDelete('cascade');       

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
