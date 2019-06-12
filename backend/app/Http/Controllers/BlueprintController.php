<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Yaml\Yaml;
use App\Activity;
use App\Blueprint;
use App\ItemSet;
use App\SkillSet;

class BlueprintController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // First, wipe the existing data:
        Activity::truncate();
        Blueprint::truncate();
        ItemSet::truncate();
        SkillSet::truncate();

        $blueprints = Yaml::parseFile('/Users/cameronhudson/Documents/GitHub/IskPrinter-Site/resources/assets/sde/fsd/blueprints.yaml');
        // echo '<pre>', print_r($blueprints), "</pre></br>\n";

        set_time_limit(0); // If not done, the process will halt after 30 seconds.

        foreach ($blueprints as $blueprint) {

            $newBlueprint = new Blueprint();
            $newBlueprint->type_id = $blueprint['blueprintTypeID'];
            echo "started on $newBlueprint->type_id.<br>\n";
            $newBlueprint->max_production_limit = $blueprint['maxProductionLimit'];

            // echo '<pre>', print_r($blueprint), "</pre></br>\n";
            foreach ($blueprint['activities'] as $activityType => $activityParams) {
                // echo '<pre>', print_r($activity), "</pre></br>\n";

                $activity = new Activity();
                $activity->activity_type = $activityType;

                $materialSet = null;
                if (array_key_exists('materials', $activityParams)) {

                    $next_item_set_id = ItemSet::count() + 1;
                    foreach ($activityParams['materials'] as $material) {
                        // echo '<pre>', print_r($material), "</pre></br>\n";
                        $materialSet = new ItemSet();
                        $materialSet->item_set_id = $next_item_set_id;
                        $materialSet->type_id = $material['typeID'];
                        $materialSet->quantity = $material['quantity'];
                        $materialSet->probability = ItemSet::UNITY;
                        $materialSet->save();
                    }
                }

                $productSet = null;
                if (array_key_exists('products', $activityParams)) {

                    $next_item_set_id = ItemSet::count() + 1;
                    foreach ($activityParams['products'] as $product) {
                        // echo '<pre>', print_r($material), "</pre></br>\n";
                        $productSet = new ItemSet();
                        $productSet->item_set_id = $next_item_set_id;
                        $productSet->type_id = $product['typeID'];
                        $productSet->quantity = $product['quantity'];
                        $productSet->probability = array_key_exists('probability', $product) ? $product['probability'] : ItemSet::UNITY;
                        $productSet->save();
                    }
                }

                $skillSet = null;;
                if (array_key_exists('skills', $activityParams)) {

                    $next_skill_set_id = Activity::count() + 1;
                    foreach ($activityParams['skills'] as $skill) {
                        // echo '<pre>', print_r($material), "</pre></br>\n";
                        $skillSet = new SkillSet();
                        $skillSet->skill_set_id = $next_skill_set_id;
                        $skillSet->type_id = $skill['typeID'];
                        $skillSet->level = $skill['level'];
                        $skillSet->save();                        
                    }
                }
                $activity->blueprint_id = $blueprint['blueprintTypeID'];
                $activity->material_set_id = $materialSet ? $materialSet->item_set_id : null;
                $activity->product_set_id = $productSet ? $productSet->item_set_id : null;
                $activity->skill_set_id = $skillSet ? $skillSet->skill_set_id : null;
                $activity->time = $activityParams['time'];
                $activity->save();

                switch ($activityType) {
                    case 'copying':
                        $newBlueprint->copying_id = $activity->activity_id;
                        break;
                    case 'invention':
                        $newBlueprint->invention_id = $activity->activity_id;
                        break;
                    case 'manufacturing':
                        $newBlueprint->manufacturing_id = $activity->activity_id;
                        break;
                    case 'reaction':
                        $newBlueprint->reaction_id = $activity->activity_id;
                        break;
                    case 'research_material':
                        $newBlueprint->research_material_id = $activity->activity_id;
                        break;
                    case 'research_time':
                        $newBlueprint->research_time_id = $activity->activity_id;
                        break;
                    default:
                        return 'ERROR: Could not identify activity type.';
                }
            }
            $newBlueprint->save();
        }
        echo 'done';
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
        $bp = Blueprint::find($id);
        // $bp->type_name = $bp->type;
        // $bp->inventionData = $bp->invention;
        // $bp->manufacturingData = $bp->manufacturing;
        // $bp->manufacturingData->materials = $bp->manufacturing->materialSet;
        echo '<pre>', print_r($bp->manufacturing->skillSet), '</pre>';
        return;
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
