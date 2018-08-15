# EveSwaggerInterface.GetCorporationsCorporationIdStructures200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**structureId** | **Number** | The Item ID of the structure | 
**typeId** | **Number** | The type id of the structure | 
**corporationId** | **Number** | ID of the corporation that owns the structure | 
**systemId** | **Number** | The solar system the structure is in | 
**profileId** | **Number** | The id of the ACL profile for this citadel | 
**fuelExpires** | **Date** | Date on which the structure will run out of fuel | [optional] 
**services** | [**[GetCorporationsCorporationIdStructuresService]**](GetCorporationsCorporationIdStructuresService.md) | Contains a list of service upgrades, and their state | [optional] 
**stateTimerStart** | **Date** | Date at which the structure entered it&#39;s current state | [optional] 
**stateTimerEnd** | **Date** | Date at which the structure will move to it&#39;s next state | [optional] 
**unanchorsAt** | **Date** | Date at which the structure will unanchor | [optional] 
**state** | **String** | state string | 
**reinforceWeekday** | **Number** | The day of the week when the structure exits its final reinforcement period and becomes vulnerable to attack against its hull. Monday is 0 and Sunday is 6. | 
**reinforceHour** | **Number** | The hour of day that determines the four hour window when the structure will randomly exit its reinforcement periods and become vulnerable to attack against its armor and/or hull. The structure will become vulnerable at a random time that is +/- 2 hours centered on the value of this property. | 
**nextReinforceWeekday** | **Number** | The requested change to reinforce_weekday that will take effect at the time shown by next_reinforce_apply. | [optional] 
**nextReinforceHour** | **Number** | The requested change to reinforce_hour that will take effect at the time shown by next_reinforce_apply. | [optional] 
**nextReinforceApply** | **Date** | The date and time when the structure&#39;s newly requested reinforcement times (e.g. next_reinforce_hour and next_reinforce_day) will take effect. | [optional] 


<a name="StateEnum"></a>
## Enum: StateEnum


* `anchor_vulnerable` (value: `"anchor_vulnerable"`)

* `anchoring` (value: `"anchoring"`)

* `armor_reinforce` (value: `"armor_reinforce"`)

* `armor_vulnerable` (value: `"armor_vulnerable"`)

* `fitting_invulnerable` (value: `"fitting_invulnerable"`)

* `hull_reinforce` (value: `"hull_reinforce"`)

* `hull_vulnerable` (value: `"hull_vulnerable"`)

* `online_deprecated` (value: `"online_deprecated"`)

* `onlining_vulnerable` (value: `"onlining_vulnerable"`)

* `shield_vulnerable` (value: `"shield_vulnerable"`)

* `unanchored` (value: `"unanchored"`)

* `unknown` (value: `"unknown"`)




