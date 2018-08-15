<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyAllTablesPrimaryKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('characters', function (Blueprint $table) {
            $table->renameColumn('id', 'character_id');
        });
        Schema::table('types', function (Blueprint $table) {
            $table->renameColumn('id', 'type_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('characters', function (Blueprint $table) {
            $table->renameColumn('character_id', 'id');
        });
        Schema::table('types', function (Blueprint $table) {
            $table->renameColumn('type_id', 'id');
        });
    }
}
