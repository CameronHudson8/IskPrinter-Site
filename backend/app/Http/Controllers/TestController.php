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
    public function get(Request $request)
    {
        return $this->getWithParams($request, "");
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getWithParams(Request $request, $route_params)
    {
        return response()->json([
          'message' => 'success',
          'path' => $route_params,
          'query_params' => $request->query()
      ]);
    }

}
