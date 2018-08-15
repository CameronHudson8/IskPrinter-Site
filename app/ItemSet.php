<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemSet extends Model
{
    public $primaryKey = 'index';
    public const UNITY = 1;
    
    // item_set hasMany consumption activities
    public function consumptionActivities()
    {
        return $this->belongsTo(
            'App\Activity',
            'material_set_id', // column name in other table
            'item_set_id'      // column name in this table
        );
    }

    // item_set hasOne production activity
    public function productionActivities()
    {
        return $this->belongsTo(
            'App\Activity',
            'product_set_id', // column name in other table
            'item_set_id'     // column name in this table
        );
    }    

    // item_set belongsToMany types
    public function types()
    {
        return $this->belongsToMany(
            'App\Type',
            'item_set_type',
            'type_id', // column name in other table
            'type_id'  // column name in this table
        );
    }  
}
