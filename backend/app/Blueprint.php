<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blueprint extends Model
{
    public $primaryKey = 'type_id';

    public function type()
    {
        return $this->belongsTo('App\Type', 'type_id', 'type_id');
    }

    // blueprint hasOne invention
    public function copying()
    {
        return $this->hasOne(
            'App\Activity',
            'activity_id',  // column name in other table
            'copying_id'  // column name in this table
        );
    }

    // blueprint hasOne invention
    public function invention()
    {
        return $this->hasOne(
            'App\Activity',
            'activity_id',  // column name in other table
            'invention_id'  // column name in this table
        );
    }

    // blueprint hasOne reaction
    public function reaction()
    {
        return $this->hasOne(
            'App\Activity',
            'activity_id',  // column name in other table
            'reaction_id'  // column name in this table
        );
    }

    // blueprint hasOne manufacturing
    public function manufacturing()
    {
        return $this->hasOne(
            'App\Activity',
            'activity_id',     // column name in other table
            'manufacturing_id' // column name in this table
        );
    }

    // blueprint hasOne manufacturing
    public function researchMaterial()
    {
        return $this->hasOne(
            'App\Activity',
            'activity_id',         // column name in other table
            'research_material_id' // column name in this table
        );
    }

    // blueprint hasOne manufacturing
    public function researchTime()
    {
        return $this->hasOne(
            'App\Activity',
            'activity_id',     // column name in other table
            'research_time_id' // column name in this table
        );
    }
}
