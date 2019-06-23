<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'cors'], function() {
    Route::resource('/tokens', 'TokenController');
});

//Route::group(['middleware' => 'cors'], function() {
//    Route::get('/activities/initialize', 'ActivityController@initialize');
//    Route::get('/activities/manufacturings', 'ActivityController@manufacturings');
//    Route::get('/activities/updateFeedQuantityMatrix', 'ActivityController@updateFeedQuantityMatrix');
//    Route::resource('/activities', 'ActivityController');
//});
//
//Route::group(['middleware' => 'cors'], function() {
//    Route::resource('/blueprints', 'BlueprintController');
//});
//
//Route::group(['middleware' => 'cors'], function() {
//    Route::get('/characters/{char_id}/refreshToken', 'CharacterController@refreshToken');
//    // Route::get('/characters/{char_id}/getConnections', 'CharacterController@getConnections');
//    Route::resource('/characters', 'CharacterController');
//});
//
//Route::group(['middleware' => 'cors'], function() {
//    Route::resource('/connections', 'ConnectionController');
//});
//
//Route::group(['middleware' => 'cors'], function() {
//    Route::resource('/marketOrders', 'MarketOrders');
//});
//
//Route::group(['middleware' => 'cors'], function() {
//    Route::get('/types/refreshAllIds', 'TypeController@refreshAllIds');
//    Route::get('/types/materialsIndex', 'TypeController@materialsIndex');
//    Route::resource('/types', 'TypeController');
//});
//
//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
//
//Route::group(['middleware' => 'cors'], function() {
//  Route::get('/test', 'TestController@get');
//  Route::get('/test/{route_params}', 'TestController@getWithParams');
//});