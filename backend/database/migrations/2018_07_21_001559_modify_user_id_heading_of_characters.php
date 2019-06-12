<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyUserIdHeadingOfCharacters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('characters', function (Blueprint $table) {
            $table->renameColumn('userId', 'user_id');
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
            $table->renameColumn('user_id', 'userId');
        });
    }
}
