<?php

namespace App\Http\Controllers;

use App\Activity;
use App\InvTypeMaterial;
use App\ItemSet;
use App\Type;
use Illuminate\Http\Request;
use Phpml\Math\Matrix;

use Symfony\Component\Yaml\Yaml;
use ZipArchive;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productTypes = json_decode(
            file_get_contents(__DIR__ . '/productTypes.json')
        );
        $feedTypes = json_decode(
            file_get_contents(__DIR__ . '/feedTypes.json')
        );
        $feedQuantityMatrix = json_decode(
                file_get_contents(__DIR__ . '/feedQuantityMatrix.json')
        );

        $A = new Matrix($feedQuantityMatrix);
        return var_dump($A);

        /*
        Pseudocode:

        $feedQuantityMatrix = makeFeedQuantityMatrix();
        $productValueVector = makeProductValueVector();
        $estimatedFeedValueVector = 
                matrix_multiply(
                    matrix_inverse(
                        matrix_multiply(
                            transpose($feedQuantityMatrix),
                            $feedQuantityMatrix)
                        ),
                    transpose($feedQuantityMatrix),
                    $productValueVector);
        $estimatedProductValueVector = 
                matrix_multiply(
                    $feedQuantityMatrix,
                    $estimatedFeedValueVector
                );
        $profitVector = $estimatedProductValueVector - $estimatedFeedValueVector;
        $volumeVector = makeVolumeVector();
        $competingOrdersVector = makeCompetingOrderVector();

        $availableVolumeVector = $volumeVector ./ (1 + $competingOrdersVector);

        $scoreVector = $availableVolumeVector .* $profitVector
        */
        
        function makeFeedQuantityMatrix() {
            // Comes from Activities table and reprocessings in the InvTypeMaterial table.

            // Each row is a different activity (for example, buying industrial matrials,
            // manufacturing, and selling at maxBuy price; or, placing a buy order
            // for an item, then creating a sell order for it.)

            // Each column is a different resource type (manufacturing feedstocks,
            // reprocessing feedstocks, market orders, isk, time)

            // The value at each column-row intersection is the quantity of resource
            // required for that activity.


            // Section 1 (starting at top) and section 2 are almost identical,
            // except that the bottom half has a 1 in the order_quantity column.
            // (The number of sell orders needed for the activity.)

            // Market orders are represented by a quantity Q of volume to trade.

        }
        function makeProductValueVector() {
            // Comes from the local region market. If no region prices are available,
            // the adjusted prices of the overall universe can be used.

            // Corresponds to the market prices resulting from the products
            // of the activities in the MaterialsMatrix.
        }

        function makeVolumeVector()
        {
            // From local region data.

            // Vector corresponding to either the buy or sell volume
            // (or perhaps both, stacked vertically).
        }

        function makeCompetingOrderVector()
        {
            // From local region data.

            // Vector corresponding to either the competing buy or sell orders
            // (or perhaps both, stacked vertically).
        }


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

    public function initialize()
    {
        // URL of most recent SDE.
        $SDE_URL = 'https://cdn1.eveonline.com/data/sde/tranquility/sde-20180713-TRANQUILITY.zip';
        $SDE_RELATIVE_PATH = '/resources/assets/';
        $SDE_ABSOLUTE_PATH = $_SERVER['DOCUMENT_ROOT'] . '/..' . $SDE_RELATIVE_PATH;

        $needToDownload = true;
        // Is there an existing SDE?
        if (file_exists($SDE_ABSOLUTE_PATH . 'sde.zip')) {

            // Is it less than 24 hours old?
            $sdeTimestamp = filemtime($SDE_ABSOLUTE_PATH . 'sde.zip');
            $sdeAge = (time() - $sdeTimestamp) / (60 * 60);
            $needNewSde = $sdeAge > 24;

            // If so, don't download a new one.
            if ($sdeAge < 24) {
                echo 'SDE is only ' . number_format($sdeAge, 2) . ' hours old.<br>'
                . 'New SDE not downloaded.<br>';
                $needToDownload = false;
            }
        }

        if ($needToDownload) {
            // Download SDE.
            file_put_contents($SDE_ABSOLUTE_PATH . 'sde.zip', fopen($SDE_URL, 'r'));
        }

        // We may already have the most recent zip, but it's not extracted.
        $needToExtract = !file_exists($SDE_ABSOLUTE_PATH . 'sde');
        if ($needToDownload || $needToExtract) {

            // Extract it.
            echo 'Extracting sde.zip...<br>';
            system("rm -rf ".escapeshellarg($SDE_ABSOLUTE_PATH . 'sde'));
            $zip = new ZipArchive;
            $res = $zip->open($SDE_ABSOLUTE_PATH . 'sde.zip');
            if ($res === true) {
                $zip->extractTo($SDE_ABSOLUTE_PATH);
                $zip->close();
            } else {
                echo 'Extraction failure!<br>';
                return;
            }
        }

        // We have the SDE.
        // If there was no need to download a new SDE,
        // and if the database is already populated, then do nothing.
        $databaseEmpty = InvTypeMaterial::count() == 0;
        if (!$needToDownload && !$needToExtract && !$databaseEmpty) {
            echo "Table 'inv_type_materials' is already up to date.<br>";
            return;
        }

        // Otherwise, insert the data into the table.
        echo "Inserting data into 'inv_type_material'.<br>";
        InvTypeMaterial::truncate();
        $data = Yaml::parseFile($SDE_ABSOLUTE_PATH . 'sde' . '/bsd/invTypeMaterials.yaml');
        foreach ($data as $row) {
            InvTypeMaterial::insert($row);
        }
        echo "Successfully imported 'inv_type_material'.<br>";
        return;
    }

    public function manufacturings()
    {
        $manufacturings = Activity::where(
            'activity_type',
            '=',
            'manufacturing'
        )
        ->join(
            'item_sets as product_sets',
            'activities.product_set_id',
            '=',
            'product_sets.item_set_id'
            )
        ->join(
            'item_sets as material_sets',
            'activities.material_set_id',
            '=',
            'material_sets.item_set_id'
        )
        ->select(
            'product_sets.type_id as product_type_id',
            'product_sets.quantity as product_quantity',
            'material_sets.type_id as feed_type_id',
            'material_sets.quantity as feed_quantity'
        )
        ->get();

    $response = [];
    foreach ($manufacturings as $row) {
        if (!array_key_exists($row->feed_type_id, $response)) {
            $response[$row->feed_type_id] = [];
            $response[$row->feed_type_id]['feedQuantity'] = $row->feed_quantity;
        }
        $response[$row->feed_type_id][$row->product_type_id] = $row->product_quantity;
    }
    return json_encode($response);
    }

    function updateFeedQuantityMatrix() {
        $activities = Activity::where(
            'activity_type',
            '=',
            'manufacturing'
        )
        ->select(
            'activities.material_set_id',
            'activities.product_set_id'
        )
        ->leftJoin(
            'item_sets as material_sets',
            'activities.material_set_id',
            '=',
            'material_sets.item_set_id'
        )
        ->leftJoin(
            'item_sets as product_sets',
            'activities.product_set_id',
            '=',
            'product_sets.item_set_id'
            )
        ->select(
            'product_sets.type_id',
            'product_sets.quantity',
            'material_sets.type_id',
            'material_sets.quantity'
        )->leftJoin(
            'types as product_types',
            'product_sets.type_id',
            '=',
            'product_types.type_id'
        )->whereNotNull(
            'product_types.name'
        ->where(
            'product_types.published','=','1'
        )
        )->leftJoin(
            'types as feed_types',
            'material_sets.type_id',
            '=',
            'feed_types.type_id'
        )->whereNotNull(
            'feed_types.name'
        ->where(
            'feed_types.published','=','1'
        )
        )->select(
            'product_sets.type_id as product_type_id',
            'product_types.name as product_name',
            'product_sets.quantity as product_quantity',
            'material_sets.type_id as feed_type_id',
            'feed_types.name as feed_name',
            'material_sets.quantity as feed_quantity'
        )
        ->get();

        $condensedActivities = [];
        $condensedFeedTypes = [];
        $productQuantities = [];

        foreach ($activities as $row) {


            if (!array_key_exists($row['product_type_id'], $condensedActivities)) {
                $condensedActivities[$row['product_type_id']] = [];
                $productQuantities[$row['product_type_id']] = $row['product_quantity'];
            }
            if (!array_key_exists($row['feed_type_id'], $condensedFeedTypes)) {
                $condensedFeedTypes[$row['feed_type_id']] = true;
            }
            $condensedActivities[$row['product_type_id']][$row['feed_type_id']] = $row['feed_quantity'];
        }

        $feedQuantityMatrix = [];
        $productTypes = array_keys($condensedActivities);
        $feedTypes = array_keys($condensedFeedTypes);
        
        foreach ($productTypes as $i => $productType) {
            $feedQuantityMatrix[] = [];
            foreach ($feedTypes as $j => $feedType) {
                if (array_key_exists($feedType, $condensedActivities[$productType])) {
                    $feedQuantityMatrix[$i][$j] = $condensedActivities[$productType][$feedType]/$productQuantities[$productType];
                } else {
                    $feedQuantityMatrix[$i][$j] = 0;
                }
            }
        }
        
        file_put_contents(
            __DIR__ . '/productTypes.json',
            json_encode($productTypes)
        );

        file_put_contents(
            __DIR__ . '/feedTypes.json',
            json_encode($feedTypes)
        );

        file_put_contents(
            __DIR__ . '/feedQuantityMatrix.json',
            json_encode($feedQuantityMatrix)
        );

        $table = "
        <html>
        <head>
        <title> php test script - hope this works </title>
        </head>
        <body>
        <h1>php & mysql connection</h1>
        <hr>
        <table border = '2'>
        <tr><th></th>";

        foreach ($feedTypes as $feedType) {
            $table .= "<th>" . Type::find($feedType)->name . "</th>";
        }
        $table .= "</tr>";

        foreach ($productTypes as $i => $productType) {
            $table .= "<tr><th>" . Type::find($productType)->name . "</th>";
            foreach ($feedTypes as $j => $feedType) {
                $table .= "<td>" . $feedQuantityMatrix[$i][$j] . "</td>";
            }
            $table .= "</tr>";
        }

        $table .= "</table></body></html>";

        return $table;
    }
}
