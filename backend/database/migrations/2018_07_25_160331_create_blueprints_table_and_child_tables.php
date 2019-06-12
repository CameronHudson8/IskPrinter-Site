<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlueprintsTableAndChildTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*
        blueprints
        type_id copying_time invention_id  manufacturing_id  res_mat_time  res_time_time maxProductionLimit_id
        842     86400        1             3                 360           2400          2030
        2082    3600         2             4                 920           600           58
        32      null         null          5                 null          null          380

        blueprint hasmany activities
        activity belongsto blueprint

        activities
        activity_id activity_type material_set_id products_set_id skills_set_id time
        1           invention     1               2               1             86400
        2           invention     3               4               2             3600
        3           manufacturing 2               1               1             120
        4           manufacturing 3               4               2             720
        5           manufacturing 1               5               2             480

        activity hasone material_set
        material_set belongstomany activities
        activity hasone product_set
        product_set belongsto activity
        activity hasone skill_set
        skill_set belongstomany activities

        items_sets (for material_set_id, product_set_id)
        index item_set_id type_id quantity probability
        1     1           30283   1183     0.3
        2     1           434     1333     0.3
        3     3           12      2222     1.0
        4     3           839     5555     1.0
        5     2           38493   1        0.3
        6     2           3892    5        0.3
        7     4           583     333      0.5
        8     5           8302    44444    1.0

        skill_sets
        index skill_set_id type_id level
        1     1            320     6
        2     1            693     2
        3     2            693     3
        4     2            25      4
        5     2            693     5
        6     2            25      2

        */
            /*
            activities:
                copying:
                    time: 4800
                invention:
                    materials:
                    -   quantity: 2
                        typeID: 20416
                    -   quantity: 2
                        typeID: 25887
                    products:
                    -   probability: 0.3
                        quantity: 1
                        typeID: 39581
                    skills:
                    -   level: 1
                        typeID: 11442
                    -   level: 1
                        typeID: 11454
                    -   level: 1
                        typeID: 21790
                    time: 63900
                manufacturing:
                    materials:
                    -   quantity: 2
                        typeID: 38
                    -   quantity: 4
                        typeID: 39
                    -   quantity: 500
                        typeID: 37
                    -   quantity: 2444
                        typeID: 36
                    -   quantity: 8000
                        typeID: 35
                    -   quantity: 22222
                        typeID: 34
                    products:
                    -   quantity: 1
                        typeID: 582
                    skills:
                    -   level: 1
                        typeID: 3380
                    time: 6000
                research_material:
                    time: 2100
                research_time:
                    time: 2100
            blueprintTypeID: 683
            maxProductionLimit: 30
            */

        // Blueprints
        // type_id copying_time invention_id  man_id  res_mat_time  res_time_time maxProductionLimit_id
        Schema::create('blueprints', function (Blueprint $table) {
            $table->integer('type_id')->unsigned()->unique(); // foreign key to types table.
            $table->timestamps();
            $table->integer('copying_id')->unsigned()->nullable();
            $table->integer('invention_id')->unsigned()->nullable(); // foreign key to activities table.
            $table->integer('reaction_id')->unsigned()->nullable(); // foreign key to activities table.
            $table->integer('manufacturing_id')->unsigned()->nullable(); // foreign key to activities table.
            $table->integer('research_material_id')->unsigned()->nullable();
            $table->integer('research_time_id')->unsigned()->nullable();
            $table->integer('max_production_limit')->unsigned();
        });

        // Activities
        // activity_id activity_type material_set_id products_set_id skills_set_id time
        Schema::create('activities', function (Blueprint $table) {
            $table->increments('activity_id')->unsigned()->unique();
            $table->timestamps();
            $table->integer('blueprint_id')->unsigned(); // foreign key to blueprints table.
            $table->enum('activity_type', [
                'copying',
                'invention',
                'reaction',
                'manufacturing',
                'research_material',
                'research_time'
            ]);
            $table->integer('material_set_id')->unsigned()->nullable(); // foreign key to item_set table.
            $table->integer('product_set_id')->unsigned()->nullable(); // foreign key to item_set table.
            $table->integer('skill_set_id')->unsigned()->nullable(); // foreign key to skill_set table.
            $table->integer('time')->unsigned();
        });

        // Item Sets (for material_set_id, product_set_id)
        // index item_set_id type_id quantity probability
        Schema::create('item_sets', function (Blueprint $table) {
            $table->increments('index')->unsigned()->unique();
            $table->timestamps();
            $table->integer('item_set_id')->unsigned();
            $table->integer('type_id')->unsigned();
            $table->integer('quantity')->unsigned();
            $table->float('probability', 4, 2)->unsigned();
        });

        // Skill Sets
        // index skill_set_id type_id level
        Schema::create('skill_sets', function (Blueprint $table) {
            $table->increments('index')->unsigned()->unique();
            $table->timestamps();
            $table->integer('skill_set_id')->unsigned();
            $table->integer('type_id')->unsigned();
            $table->tinyInteger('level')->unsigned();
        });

        // ---- Intermediary Tables ---- //
        Schema::create('item_set_type', function (Blueprint $table) {
            $table->increments('index')->unsigned()->unique();
            $table->timestamps();
            $table->integer('item_set_id')->unsigned();
            $table->integer('type_id')->unsigned();
        });
        Schema::create('skill_set_type', function (Blueprint $table) {
            $table->increments('index')->unsigned()->unique();
            $table->timestamps();
            $table->integer('skill_set_id')->unsigned();
            $table->integer('type_id')->unsigned();
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blueprints');
        Schema::dropIfExists('activities');
        Schema::dropIfExists('item_sets');
        Schema::dropIfExists('skill_sets');
        Schema::dropIfExists('item_set_type');
        Schema::dropIfExists('skill_set_type');
    }
}
