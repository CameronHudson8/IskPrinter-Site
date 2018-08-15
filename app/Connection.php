<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{
    public $origin;
    public $destId;
    public $type;
    public $dos;

    public function __construct($origin, $destId, $type, $dos) {
        $this->origin = $origin;
        $this->id = $id;
        $this->type = $type;
        $this->dos = $dos;
    }
}
