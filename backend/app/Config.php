<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;
use Swagger\Client\Api\AllianceApi;
use Swagger\Client\Api\AssetsApi;
use Swagger\Client\Api\CharacterApi;
use Swagger\Client\Api\ClonesApi;
use Swagger\Client\Api\MarketApi;
use Swagger\Client\Api\UniverseApi;
use Swagger\Client\Configuration;

class Config extends Model
{
    // These configuration constants are used for calls to the ESI API.
    public const DATASOURCE = 'tranquility';
    public const IF_NONE_MATCH = 'if_none_match_example';
    public const ACCEPT_LANGUAGE = 'en-us';
    public const LANGUAGE = 'en-us';
    public const MAX_WAR_ID = null;
    public const KARMAFLEET_CORP_ID = 98370861;

    public static $api;

    public static function initApis($accessToken){
        if (!self::$api) {

            $config = Configuration::getDefaultConfiguration()
                    ->setAccessToken($accessToken);

            self::$api = [
                'alliance' => new AllianceApi(new Client(), $config),
                'assets' => new AssetsApi(new Client(), $config),
                'character' => new CharacterApi(new Client(), $config),
                'clones' => new ClonesApi(new Client(), $config),
                'market' => new MarketApi(new Client(), $config),
                'universe' => new UniverseApi(new Client(), $config),
            ];
        }
    }
}
