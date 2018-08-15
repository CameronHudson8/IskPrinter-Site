<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class IncreaseSizesOf4ColumnsOfTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('types', function (Blueprint $table) {
            $table->decimal('radius', 16, 2)->unsigned()->nullable()->change();
            $table->decimal('mass', 42, 2)->unsigned()->nullable()->change();
            $table->decimal('packaged_volume', 16, 2)->unsigned()->nullable()->change();
            $table->decimal('volume', 16, 2)->unsigned()->nullable()->change();
            $table->decimal('capacity', 16, 2)->unsigned()->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('types', function (Blueprint $table) {
            $table->float('radius', 8, 2)->unsigned()->nullable()->change();
            $table->float('mass', 8, 2)->unsigned()->nullable()->change();
            $table->float('packaged_volume', 8, 2)->unsigned()->nullable()->change();
            $table->float('volume', 8, 2)->unsigned()->nullable()->change();
            $table->float('capacity', 8, 2)->unsigned()->nullable()->change();
        });
    }
}
