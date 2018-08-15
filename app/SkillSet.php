<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SkillSet extends Model
{
    public $primaryKey = 'index';
    public const UNITY = 1;
    
    // skill_set hasMany activities
    public function activities()
    {
        return $this->belongsTo(
            'App\Activity',
            'skill_set_id', // column name in other table
            'skill_set_id'  // column name in this table
        );
    } 

    // skill_set belongsToMany types
    public function types()
    {
        return $this->belongsToMany(
            'App\Type',
            'skill_set_type',
            'type_id', // column name in other table
            'type_id'  // column name in this table
        );
    }  
}
