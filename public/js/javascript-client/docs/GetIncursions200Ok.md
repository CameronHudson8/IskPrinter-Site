# EveSwaggerInterface.GetIncursions200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | The type of this incursion | 
**state** | **String** | The state of this incursion | 
**influence** | **Number** | Influence of this incursion as a float from 0 to 1 | 
**hasBoss** | **Boolean** | Whether the final encounter has boss or not | 
**factionId** | **Number** | The attacking faction&#39;s id | 
**constellationId** | **Number** | The constellation id in which this incursion takes place | 
**stagingSolarSystemId** | **Number** | Staging solar system for this incursion | 
**infestedSolarSystems** | **[Number]** | A list of infested solar system ids that are a part of this incursion | 


<a name="StateEnum"></a>
## Enum: StateEnum


* `withdrawing` (value: `"withdrawing"`)

* `mobilizing` (value: `"mobilizing"`)

* `established` (value: `"established"`)




