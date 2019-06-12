<?php

namespace App\Http\Controllers;

use App\Character;
use Illuminate\Http\Request;

class ConnectionController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $applicant = Character::find($character_id);
        $connections = $applicant->getConnections();
        return view('createConnections');
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
        $data = json_encode(
            [
                'summary' => '18 of 2933 (0.6%) of connections were determined to be questionable, with a minimum separation of 1 degree(s) and an average separation of 4.6 degree(s).',
                'badConnections' => 0,
                'totalConnections' => 0,
                'percentageBad' => 0,
                'minimumBadSeparation' => 1,
                'averageBadSeparation' => 4,
                'graph' => [
                    'nodes' => [
                        [
                            'name' => 'Peter',
                            'label' => 'Person',
                            'id' => 1
                        ],
                        [
                            'name' => 'Michael',
                            'label' => 'Person',
                            'id' => 2
                        ],
                        [
                            'name' => 'Neo4j',
                            'label' => 'Database',
                            'id' => 3
                        ],
                        [
                            'name' => 'Graph Database',
                            'label' => 'Database',
                            'id' => 4
                        ]
                    ], 'links' => [
                        [
                            'source' => 1,
                            'target' => 2,
                            'type' => 'KNOWS',
                            'since' => 2010
                        ],
                        [
                            'source' => 1,
                            'target' => 3,
                            'type' => 'FOUNDED'
                        ],
                        [
                            'source' => 2,
                            'target' => 3,
                            'type' => 'WORKS_ON'
                        ],
                        [
                            'source' => 3,
                            'target' => 4,
                            'type' => 'is bitch of'
                        ]
                    ]
                ]
            ]
        );
        return view('connections')->with('data', $data);
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
}
