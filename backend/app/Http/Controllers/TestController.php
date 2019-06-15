<?php

namespace App\Http\Controllers;

use App\Config;
use App\Type;
use Illuminate\Http\Request;
use Exception;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return '{"message": "test success"}';
    }
}
