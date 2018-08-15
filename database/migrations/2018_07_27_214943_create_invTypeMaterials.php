<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvTypeMaterials extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //-   materialTypeID: 34
    // quantity: 4096
    // typeID: 29

        Schema::create('inv_type_materials', function (Blueprint $table) {
            $table->increments('index');
            $table->integer('materialTypeID')->unsigned();
            $table->integer('quantity')->unsigned();
            $table->integer('typeID')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inv_type_materials');
    }
}
