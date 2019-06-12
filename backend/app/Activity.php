<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    public $primaryKey = 'activity_id';

    // activity belongsTo blueprint
    public function blueprint()
    {
        return $this->belongsTo(
            'App\Blueprint',
            'type_id',     // column name in other table
            'blueprint_id' // column name in this table
        );
    }

    // activity hasOne material_set
    public function materialSet()
    {
        return $this->hasMany(
            'App\ItemSet',
            'item_set_id',    // column name in other table
            'material_set_id' // column name in this table
        );
    }
    
    // activity hasOne product_set
    public function productSet()
    {
        return $this->hasMany(
            'App\ItemSet',
            'item_set_id',     // column name in other table
            'product_set_id' // column name in this table
        );
    }

    // activity hasOne skill_set
    public function skillSet()
    {
        return $this->hasMany(
            'App\SkillSet',
            'skill_set_id', // column name in other table
            'skill_set_id'  // column name in this table
        );
    }
}
