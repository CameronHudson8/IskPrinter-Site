# EveSwaggerInterface.GetFleetsFleetIdMembers200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**characterId** | **Number** | character_id integer | 
**shipTypeId** | **Number** | ship_type_id integer | 
**wingId** | **Number** | ID of the wing the member is in. If not applicable, will be set to -1 | 
**squadId** | **Number** | ID of the squad the member is in. If not applicable, will be set to -1 | 
**role** | **String** | Member’s role in fleet | 
**roleName** | **String** | Localized role names | 
**joinTime** | **Date** | join_time string | 
**takesFleetWarp** | **Boolean** | Whether the member take fleet warps | 
**solarSystemId** | **Number** | Solar system the member is located in | 
**stationId** | **Number** | Station in which the member is docked in, if applicable | [optional] 


<a name="RoleEnum"></a>
## Enum: RoleEnum


* `fleet_commander` (value: `"fleet_commander"`)

* `wing_commander` (value: `"wing_commander"`)

* `squad_commander` (value: `"squad_commander"`)

* `squad_member` (value: `"squad_member"`)




