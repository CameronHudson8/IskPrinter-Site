<?php

namespace App\Http\Controllers;

use App\Character;
use App\User;
use App\Providers\EveAuthServiceProvider;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $stateData = json_decode(decrypt($_GET['state']));
        $stateId = $stateData->id;
        $stateNonce = $stateData->nonce;
        $user = User::findOrFail($stateId);
        if (!($user->state === $stateNonce)) {
            return '<pre>' . var_dump([
                'user id' => $user->id,
                'user name' => $user->name,
                'user state' => $user->state,
                'state id' => $stateData->id,
                'state nonce' => $stateData->nonce,
            ]) . '</pre>';
        }
        $code = $_GET['code'];

        $characterData = EveAuthServiceProvider::getBasicCharacterData($code);
        $characterData['user_id'] = $stateId;
        $this->store($characterData);
        return redirect('/');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($data)
    {
        $character = Character::find($data['basicCharacterData']->CharacterID);
        if (!$character) {
            $character = new Character;
        }
        $character->user_id = $data['user_id'];

        $character->accessToken = $data['tokens']->access_token;
        $character->expiresOn = time() + $data['tokens']->expires_in;
        $character->refreshToken = $data['tokens']->refresh_token;

        $character->character_id = $data['basicCharacterData']->CharacterID;
        $character->characterName = $data['basicCharacterData']->CharacterName;
        $character->characterOwnerHash = $data['basicCharacterData']->CharacterOwnerHash;
        $character->save();
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

    public static function refreshToken($character_id)
    {
        $character = Character::find($character_id);
        return $character->accessToken();
                //     ->header('Access-Control-Allow-Origin', '*');
    }

}
