<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    public $primaryKey = 'type_id';

    protected $fillable = [
        'type_id',
        'capacity',
        'description',
        'graphic_id',
        'group_id',
        'icon_id',
        'market_group_id',
        'mass',
        'name',
        'packaged_volume',
        'portion_size',
        'published',
        'radius',
        'volume',
    ];

    public function blueprint()
    {
        return $this->hasOne('App\Blueprint', 'type_id', 'type_id');
    }

    // type belongsToMany item sets
    public function itemSets()
    {
        return $this->belongsToMany(
            'App\ItemSet',
            'item_set_type',
            'type_id', // column name in other table
            'type_id'  // column name in this table
        );
    }  

    // type belongsToMany skillSets
    public function skillSets()
    {
        return $this->belongsToMany(
            'App\SkillSet',
            'skill_set_type',
            'type_id', // column name in other table
            'type_id'  // column name in this table
        );
    }  

}
