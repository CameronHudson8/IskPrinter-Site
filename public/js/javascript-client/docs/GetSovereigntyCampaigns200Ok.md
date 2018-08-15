# EveSwaggerInterface.GetSovereigntyCampaigns200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**campaignId** | **Number** | Unique ID for this campaign. | 
**structureId** | **Number** | The structure item ID that is related to this campaign.  | 
**solarSystemId** | **Number** | The solar system the structure is located in.  | 
**constellationId** | **Number** | The constellation in which the campaign will take place.  | 
**eventType** | **String** | Type of event this campaign is for. tcu_defense, ihub_defense and station_defense are referred to as \&quot;Defense Events\&quot;, station_freeport as \&quot;Freeport Events\&quot;.  | 
**startTime** | **Date** | Time the event is scheduled to start.  | 
**defenderId** | **Number** | Defending alliance, only present in Defense Events  | [optional] 
**defenderScore** | **Number** | Score for the defending alliance, only present in Defense Events.  | [optional] 
**attackersScore** | **Number** | Score for all attacking parties, only present in Defense Events.  | [optional] 
**participants** | [**[GetSovereigntyCampaignsParticipant]**](GetSovereigntyCampaignsParticipant.md) | Alliance participating and their respective scores, only present in Freeport Events.  | [optional] 


<a name="EventTypeEnum"></a>
## Enum: EventTypeEnum


* `tcu_defense` (value: `"tcu_defense"`)

* `ihub_defense` (value: `"ihub_defense"`)

* `station_defense` (value: `"station_defense"`)

* `station_freeport` (value: `"station_freeport"`)




