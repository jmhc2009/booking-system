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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('date');
            $table->string('hour');
            $table->string('flight_number',10);
            $table->string('airline',50);
            $table->string('from',60);
            $table->string('until',60);
            $table->string('passenger',150);
            $table->float('price',12,2);
            $table->float('parking_price',12,2);
            $table->float('total_price',12,2);
            $table->string('vehicle',12);
            $table->enum('status',['Solicitud enviada','agendada','realizada']);
            $table->string('observation');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
