<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCharactersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->integer('userId')->unsigned();
            $table->integer('characterId')->unsigned()->unique();
            $table->string('characterName');
            $table->timestamps();
            $table->string('accessToken');
            $table->integer('expiresOn')->unsigned();
            $table->string('refreshToken');
            $table->string('characterOwnerHash');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('characters');
    }
}
