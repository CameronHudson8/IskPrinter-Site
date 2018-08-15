# EveSwaggerInterface.GetCorporationsCorporationIdStarbases200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**starbaseId** | **Number** | Unique ID for this starbase (POS) | 
**typeId** | **Number** | Starbase (POS) type | 
**systemId** | **Number** | The solar system this starbase (POS) is in, unanchored POSes have this information | 
**moonId** | **Number** | The moon this starbase (POS) is anchored on, unanchored POSes do not have this information | [optional] 
**state** | **String** | state string | [optional] 
**unanchorAt** | **Date** | When the POS started unanchoring, for starbases (POSes) in unanchoring state | [optional] 
**reinforcedUntil** | **Date** | When the POS will be out of reinforcement, for starbases (POSes) in reinforced state | [optional] 
**onlinedSince** | **Date** | When the POS onlined, for starbases (POSes) in online state | [optional] 


<a name="StateEnum"></a>
## Enum: StateEnum


* `offline` (value: `"offline"`)

* `online` (value: `"online"`)

* `onlining` (value: `"onlining"`)

* `reinforced` (value: `"reinforced"`)

* `unanchoring` (value: `"unanchoring"`)




