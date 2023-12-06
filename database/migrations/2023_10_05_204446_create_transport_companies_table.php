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
        Schema::create('transport_companies', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('user_id');           
            $table->string('business_name',150);
            $table->string('rut',20);
            $table->string('turn',80);
            $table->string('address',150);
            $table->string('phone',25);
            $table->string('email',65);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('transport_companies');
    }
};
