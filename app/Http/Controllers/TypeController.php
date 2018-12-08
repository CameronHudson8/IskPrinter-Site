<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use App\Activity;
use App\Blueprint;
use App\Config;
use App\ItemSet;
use App\Type;
use GuzzleHttp\Client;
use Schema;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Type::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    // Synchronize the types database table with CCP's endpoint.
    public static function refreshAllIds()
    {
        $typeIds = [];

        $getTypes = function($page)
        {
            return Config::$api['universe']->getUniverseTypes(
                Config::DATASOURCE,
                Config::IF_NONE_MATCH,
                $page
            );
        };

        for ($page = 1; count($data = $getTypes($page)) > 0; $page += 1) {
            $typeIds = array_merge($typeIds, $data);
        }

        // Remove obsolete items from database
        Type::whereNotIn('type_id', $typeIds)->delete();

        $possibleFields = Schema::getColumnListing('types');

        set_time_limit(0); // If not done, the process will halt after 30 seconds.
        ini_set('memory_limit', '1024M');
        foreach ($typeIds as $typeId) {

            // echo 'attempting to get: ' . "var_dump(Type::find(" . 0 . ")";
            // return var_dump(Type::find(2));
            if (!Type::find($typeId)) {
                $typeData = [];

                $responseData = Config::$api['universe']->getUniverseTypesTypeId(
                    $typeId,
                    Config::ACCEPT_LANGUAGE,
                    Config::DATASOURCE,
                    Config::IF_NONE_MATCH,
                    Config::LANGUAGE
                );
                $responseData = json_decode($responseData);
                
                $notFound = [];
                foreach ($possibleFields as $field) {
                    if (property_exists($responseData, $field)) {
                        $typeData[$field] = $responseData->$field;
                    } else {
                        $notFound[$field] = null;
                    }
                }

                if (!array_key_exists('type_id', $typeData)) {
                    echo '<pre>', var_dump([
                        'looking for' => $possibleFields,
                        'within' => $responseData,
                        'found' => $typeData,
                        'not found' => $notFound
                    ]), '</pre>';
                    return;
                }

                Type::create($typeData);
            }
        }
        return Type::all();
    }

    public static function materialsIndex()
    {
        // TODO Make sure the SDE is up to date and in the database by running this:
        // App\Http\Controllers\ActivityController::initialize();
        // But it's poor form (and potentially not possible) to run
        // one controller's functions from another. Need another solution.

        $reprocessings = DB::table('inv_type_materials')
                ->join('types',
                'inv_type_materials.typeID',
                '=',
                'types.type_id')
                ->select(
                    'inv_type_materials.typeID as feed_type_id',
                    'types.portion_size as feed_quantity',
                    'inv_type_materials.materialTypeID as product_type_id',
                    'inv_type_materials.quantity as product_quantity'
                )->get();

        $response = [];
        foreach ($reprocessings as $row) {
            if (!array_key_exists($row->feed_type_id, $response)) {
                $response[$row->feed_type_id] = [];
                $response[$row->feed_type_id]['feedQuantity'] = $row->feed_quantity;
            }
            $response[$row->feed_type_id][$row->product_type_id] = $row->product_quantity;
        }
        return json_encode($response);
    }
}
