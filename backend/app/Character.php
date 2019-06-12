<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Character;
use App\Config;
use App\Connection;
use App\Type;
use App\Providers\EveAuthServiceProvider;

class Character extends Model
{
    public $primaryKey = 'character_id';

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function accessToken()
    {
        // If the access token is within 5 minutes of expiration,
        if ($this->expiresOn - 60 * 5 < time()) {

            // Refresh the access token.
            $freshToken = EveAuthServiceProvider::getFreshToken($this->refreshToken);
            $this->accessToken = $freshToken->access_token;
            $this->expiresOn = time() + $freshToken->expires_in;
            $this->save();
        }
        return $this->accessToken;
    }

    // -------- KarmaFleet stuff -------- //

    // These configuration constants are used for calls to the ESI API.
    // private $characterApi = null;


    public function getCorporationHistory()
    {
        Config::initApis($this->accessToken());
        return Config::$api['character']->getCharactersCharacterIdCorporationhistory(
            $this->character_id,
            Config::DATASOURCE,
            Config::IF_NONE_MATCH
        );
    }

    public function getAssets()
    {
        Config::initApis($this->accessToken());

        $getAssets = function($page)
        {
            return Config::$api['assets']->getCharactersCharacterIdAssets(
                $this->character_id,
                Config::DATASOURCE,
                Config::IF_NONE_MATCH,
                $page,
                $this->accessToken
            );
        };
        $assets = [];
        for ($page = 1; count($data = $getAssets($page)) > 0; $page += 1) {
            $assets = array_merge($assets, $data);
        }
        return $assets;
    }

    public function getClones()
    {
        Config::initApis($this->accessToken());
        return Config::$api['clones']->getCharactersCharacterIdClones(
            $this->character_id,
            Config::DATASOURCE,
            Config::IF_NONE_MATCH,
            $this->accessToken()
        );
    }

    public function getConnections()
    {
        $alreadySeen = [];
        $queue = [];

        // The corp history is in reverse chronological order.
        // Therefore, the character's birthcorp (NPC corp) will be
        // the nth entry. Ignore it.
        $corpHistory = $this->getCorporationHistory();
        for ($i = 0; $i < count($corpHistory) - 1; $i += 1) {
            $corporation_id = $corpHistory[$i]['corporation_id'];
            if (!array_key_exists($corporation_id, $alreadySeen)) {
                $queue[] = new Connection(
                    $this->characterName,
                    $corporation_id,
                    'corporation',
                    1
                );
                $alreadySeen[$corporation_id] = true;
            }
        }

        // Get the locations of all assets.
        $assets = $this->getAssets();
        foreach ($assets as $asset) {
            $location_id = $asset['location_id'];
            if (!array_key_exists($location_id, $alreadySeen)) {
                $queue[] = new Connection(
                    $this->characterName,
                    $location_id,
                    'location',
                    1
                );
                $alreadySeen[$location_id] = true;
            }
        }

        // Get the locations of all clones.
        $clones = $this->getClones();
        $cloneLocations = [];
        $cloneLocations[] = $clones['home_location']['location_id'];
        foreach ($clones['jump_clones'] as $jumpClone) {
            $cloneLocations[] = $jumpClone['location_id'];
        }
        foreach ($cloneLocations as $cloneLocation) {
            if (!array_key_exists($cloneLocation, $alreadySeen)) {
                $queue[] = new Connection(
                    $this->characterName,
                    $cloneLocation,
                    'location',
                    1
                );
                $alreadySeen[$cloneLocation] = true;
            }
        }

        return $queue;
    }
}
