<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use App\User;

class EveAuthServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * In order for the user to add a character, they must log in with CCP
     * at a specific URL. This function generates that URL.
     *
     * @return string
     */
    public static function LOGON_URL()
    {
        $IS_LOCAL = !(false === strpos($_SERVER['HTTP_HOST'], 'localhost'));
    
        $REDIRECT_URI = $IS_LOCAL ? 
                'http://localhost:8080/api/characters/create' :
                'https://iskprinter.com/api/characters/create';
                        
        $BASE_URL = 'login.eveonline.com';

        // Get an authorization code for permanent access (as opposed to an
        // access token for Implicit Flow)
        $RESPONSE_TYPE = 'code';
        $SCOPES = [
            /*
            'esi-alliances.read_contacts.v1',
            */
            'esi-assets.read_assets.v1',
            /*
            'esi-assets.read_corporation_assets.v1',
            'esi-bookmarks.read_character_bookmarks.v1',
            'esi-bookmarks.read_corporation_bookmarks.v1',
            'esi-calendar.read_calendar_events.v1',
            'esi-calendar.respond_calendar_events.v1',
            'esi-characters.read_agents_research.v1',
            'esi-characters.read_blueprints.v1',
            'esi-characters.read_chat_channels.v1',
            'esi-characters.read_contacts.v1',
            'esi-characters.read_corporation_roles.v1',
            'esi-characters.read_fatigue.v1',
            'esi-characters.read_fw_stats.v1',
            'esi-characters.read_loyalty.v1',
            'esi-characters.read_medals.v1',
            'esi-characters.read_notifications.v1',
            'esi-characters.read_opportunities.v1',
            'esi-characters.read_standings.v1',
            'esi-characters.read_titles.v1',
            'esi-characters.write_contacts.v1',
            */
            'esi-characterstats.read.v1',
            'esi-clones.read_clones.v1',
            /*
            'esi-clones.read_implants.v1',
            'esi-contracts.read_character_contracts.v1',
            'esi-contracts.read_corporation_contracts.v1',
            'esi-corporations.read_blueprints.v1',
            'esi-corporations.read_contacts.v1',
            'esi-corporations.read_container_logs.v1',
            'esi-corporations.read_corporation_membership.v1',
            'esi-corporations.read_divisions.v1',
            'esi-corporations.read_facilities.v1',
            'esi-corporations.read_fw_stats.v1',
            'esi-corporations.read_medals.v1',
            'esi-corporations.read_outposts.v1',
            'esi-corporations.read_standings.v1',
            'esi-corporations.read_starbases.v1',
            'esi-corporations.read_structures.v1',
            'esi-corporations.read_titles.v1',
            'esi-corporations.track_members.v1',
            'esi-corporations.write_structures.v1',
            'esi-fittings.read_fittings.v1',
            'esi-fittings.write_fittings.v1',
            'esi-fleets.read_fleet.v1',
            'esi-fleets.write_fleet.v1',
            'esi-industry.read_character_jobs.v1',
            'esi-industry.read_character_mining.v1',
            'esi-industry.read_corporation_jobs.v1',
            'esi-industry.read_corporation_mining.v1',
            'esi-killmails.read_corporation_killmails.v1',
            'esi-killmails.read_killmails.v1',
            */
            'esi-location.read_location.v1',
            /*
            'esi-location.read_online.v1',
            'esi-location.read_ship_type.v1',
            'esi-mail.organize_mail.v1',
            'esi-mail.read_mail.v1',
            'esi-mail.send_mail.v1',
            */
            'esi-markets.read_character_orders.v1',
            /*
            'esi-markets.read_corporation_orders.v1',
            */
            'esi-markets.structure_markets.v1',
            /*
            'esi-planets.manage_planets.v1',
            'esi-planets.read_customs_offices.v1',
            'esi-search.search_structures.v1',
            'esi-skills.read_skillqueue.v1',
            */
            'esi-skills.read_skills.v1',
            /*
            'esi-ui.open_window.v1',
            'esi-ui.write_waypoint.v1',
            'esi-universe.read_structures.v1',
            */
            'esi-wallet.read_character_wallet.v1',
            /*
            'esi-wallet.read_corporation_wallets.v1',
            */
            ];
    
        $user = User::find(Auth::user()->id);
        $STATE = encrypt(json_encode(['id' => $user->id, 'nonce' => $user->state]));
        return 'https://' . $BASE_URL . '/oauth/authorize?'
                . 'response_type=' . $RESPONSE_TYPE
                . '&redirect_uri=' . $REDIRECT_URI
                . '&client_id=' . env('CLIENT_ID')
                . '&scope=' . implode(' ', $SCOPES)
                . '&state=' . $STATE;
    }

    public static function getBasicCharacterData($code)
    {
        $authorization = 'Basic ' . base64_encode(env('CLIENT_ID') . ':' . env('CLIENT_SECRET'));
        $client = new Client();
        
        // Get the access and refresh tokens.
        $response = $client->request('POST', 'https://login.eveonline.com/oauth/token', [
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization' => $authorization,
            ],
            'form_params' => [
                'grant_type' => 'authorization_code',
                'code' => $code,
            ],
        ]);
        $tokens = json_decode($response->getBody());
        // echo '<pre>', print_r($tokens), "</pre><br>\n";

        // Get the character's id, name, and other basic data.
        $response = $client->request('GET', 'https://esi.tech.ccp.is/verify', [
            'headers' => [
                // 'Content-Type' => 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization' => 'Bearer ' . $tokens->access_token,
            ],
            // 'form_params' => [
            //     'grant_type' => 'authorization_code',
            //     'code' => $code,
            // ],
        ]);
        $basicCharacterData = json_decode($response->getBody());
        // echo '<pre>', print_r($basicCharacterData), "</pre><br>\n";
        $data = [
            'tokens' => $tokens,
            'basicCharacterData' => $basicCharacterData
        ];
        return $data;
    }

    public static function getFreshToken($refreshToken)
    {
        $authorization = 'Basic ' . base64_encode(env('CLIENT_ID') . ':' . env('CLIENT_SECRET'));
        $client = new Client();

        // Get the character's id, name, and other basic data.
        $response = $client->request('POST', 'https://login.eveonline.com/oauth/token', [
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization' => $authorization,
            ],
            'form_params' => [
                'grant_type' => 'refresh_token',
                'refresh_token' => $refreshToken,
            ],
        ]);
        $freshToken = json_decode($response->getBody());
        return $freshToken;
    }    
}
