# EveSwaggerInterface.GetFleetsFleetIdMembers200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**characterId** | **Number** | character_id integer | 
**joinTime** | **Date** | join_time string | 
**role** | **String** | Member’s role in fleet | 
**roleName** | **String** | Localized role names | 
**shipTypeId** | **Number** | ship_type_id integer | 
**solarSystemId** | **Number** | Solar system the member is located in | 
**squadId** | **Number** | ID of the squad the member is in. If not applicable, will be set to -1 | 
**stationId** | **Number** | Station in which the member is docked in, if applicable | [optional] 
**takesFleetWarp** | **Boolean** | Whether the member take fleet warps | 
**wingId** | **Number** | ID of the wing the member is in. If not applicable, will be set to -1 | 


<a name="RoleEnum"></a>
## Enum: RoleEnum


* `fleet_commander` (value: `"fleet_commander"`)

* `wing_commander` (value: `"wing_commander"`)

* `squad_commander` (value: `"squad_commander"`)

* `squad_member` (value: `"squad_member"`)




