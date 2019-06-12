<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Add13ColumnsToTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('types', function (Blueprint $table) {
            $table->float('capacity', 8, 2)->unsigned()->nullable();
            $table->text('description');
            // $table->dogma_attributes omitted for now because this will need its own table.
            // $table->dogma_effects omitted for now because this will need its own table.
            $table->integer('graphic_id')->unsigned()->nullable();
            $table->integer('group_id')->unsigned();
            $table->integer('icon_id')->unsigned()->nullable();
            $table->integer('market_group_id')->unsigned()->nullable();
            $table->float('mass', 8, 2)->unsigned()->nullable();
            $table->string('name');
            $table->float('packaged_volume', 8, 2)->unsigned()->nullable();
            $table->integer('portion_size')->unsigned()->nullable();
            $table->boolean('published');
            $table->float('radius', 8, 2)->unsigned()->nullable();
            $table->float('volume', 8, 2)->unsigned()->nullable();
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
            $table->dropColumn('capacity');
            $table->dropColumn('description');
            // $table->dropColumn('dogma_attributes');
            // $table->dropColumn('dogma_effects');
            $table->dropColumn('graphic_id');
            $table->dropColumn('group_id');
            $table->dropColumn('icon_id');
            $table->dropColumn('market_group_id');
            $table->dropColumn('mass');
            $table->dropColumn('name');
            $table->dropColumn('packaged_volume');
            $table->dropColumn('portion_size');
            $table->dropColumn('published');
            $table->dropColumn('radius');
            $table->dropColumn('volume');
        });
    }
}
