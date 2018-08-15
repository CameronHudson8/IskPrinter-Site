<?php

namespace App\Http\Controllers;

use App\Config;
use App\Type;
use Illuminate\Http\Request;
use Exception;

class MarketOrders extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        echo "MARKET CAPITLIZATIONS IN DELVE<br>\n<hr>";

        $productTypes = (array) json_decode(
            file_get_contents(__DIR__ . '/productTypes.json')
        );
        $feedTypes = (array) json_decode(
            file_get_contents(__DIR__ . '/feedTypes.json')
        );

        $marketCaps = (array) json_decode(
            file_get_contents(__DIR__ . '/marketCaps.json')
        );

        // var_dump($marketCaps);
        // return;

        // $types = array_merge($productTypes, $feedTypes);
        // $types = array_merge($productTypes);
        $types = Type::where('published', '=', '1')->whereNotNull('name')->get();

        if (!$marketCaps) {
            $marketCaps = [];
        }
        foreach ($types as $type) {
            $name = $type->name;
            echo $name . "<br>\n";
            if (!array_key_exists($name, $marketCaps)) {
                $stats = $this->avgDelveStats($type->type_id);
                $marketCaps[$name] = $stats['avgPrice'] * $stats['avgDailyVolume'];
                arsort($marketCaps);
                file_put_contents(
                    __DIR__ . '/marketCaps.json',
                    json_encode($marketCaps)
                );
            }
        }

        $productMarketCaps = [];
        foreach ($productTypes as $type) {
            $name = Type::find($type)->name;
            $productMarketCaps[$name] = $marketCaps[$name];
        }


        arsort($productMarketCaps);
        file_put_contents(
            __DIR__ . '/productMarketCaps.json',
            json_encode($productMarketCaps)
        );

        echo '<pre>', print_r($marketCaps), '</pre>';
        return;
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
    public function show($id) // $id could be market or item.
    {

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

    public function avgDelveStats($type_id)
    {
        return $this->avgStats(10000060, $type_id);
    }

    public function avgCloudRingStats($type_id)
    {
        return $this->avgStats(10000051, $type_id);
    }

    public function avgStats($region_id, $type_id)
    {
        $kronnToken = CharacterController::refreshToken(95448633);
        Config::initApis($kronnToken);
        // $region_id = 10000060; // Delve
        // $type_id = 24700; // Myrmidon
        $regionHistory = null;
        try {
            $regionHistory = Config::$api['market']->getMarketsRegionIdHistory(
                $region_id,
                $type_id,
                Config::DATASOURCE,
                Config::IF_NONE_MATCH
            );
            echo "Downloaded market history of item $type_id: " . Type::find($type_id)->name . ".<br>\n";
        } catch (Exception $e) {
            echo 'Error when looking up region history of ' . Type::find($type_id)->name . ":<br>\n";
            echo $e->getMessage() . "<br>\n";
        }

        if ($regionHistory && array_key_exists(0, $regionHistory)) {
            $firstDay = $regionHistory[0]['date']->getTimestamp();
            $finalDay = $regionHistory[count($regionHistory) - 1]['date']->getTimestamp();
            // echo '$firstDay = ' . "$firstDay <br>\n";
            // echo '$finalDay = ' . "$finalDay <br>\n";
    
            $totalVolume = 0;
            $totalOfAveragePrices = 0;
            foreach ($regionHistory as $row) {
                $totalVolume += $row['volume'];
                $totalOfAveragePrices += $row['average'];
            }
            $days = ($finalDay - $firstDay) / 3600 / 24 + 1;
            // echo '$days = ' . "$days <br>\n";
            $avgDailyVolume = $totalVolume / $days;
            $avgPrice = $totalOfAveragePrices / $days;
        } else {
            $avgDailyVolume = 0;
            $avgPrice = null;
        }

        // echo '$avgDailyVolume = ' . "$avgDailyVolume <br>\n";
        $delveStats = [
            'avgDailyVolume' => $avgDailyVolume,
            'avgPrice' => $avgPrice,
        ];
        return $delveStats;
    }
}
