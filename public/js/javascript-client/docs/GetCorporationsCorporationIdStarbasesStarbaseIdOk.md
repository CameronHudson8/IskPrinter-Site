# EveSwaggerInterface.GetCorporationsCorporationIdStarbasesStarbaseIdOk

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**allowAllianceMembers** | **Boolean** | allow_alliance_members boolean | 
**allowCorporationMembers** | **Boolean** | allow_corporation_members boolean | 
**anchor** | **String** | Who can anchor starbase (POS) and its structures | 
**attackIfAtWar** | **Boolean** | attack_if_at_war boolean | 
**attackIfOtherSecurityStatusDropping** | **Boolean** | attack_if_other_security_status_dropping boolean | 
**attackSecurityStatusThreshold** | **Number** | Starbase (POS) will attack if target&#39;s security standing is lower than this value | [optional] 
**attackStandingThreshold** | **Number** | Starbase (POS) will attack if target&#39;s standing is lower than this value | [optional] 
**fuelBayTake** | **String** | Who can take fuel blocks out of the starbase (POS)&#39;s fuel bay | 
**fuelBayView** | **String** | Who can view the starbase (POS)&#39;s fule bay. Characters either need to have required role or belong to the starbase (POS) owner&#39;s corporation or alliance, as described by the enum, all other access settings follows the same scheme | 
**fuels** | [**[GetCorporationsCorporationIdStarbasesStarbaseIdFuel]**](GetCorporationsCorporationIdStarbasesStarbaseIdFuel.md) | Fuel blocks and other things that will be consumed when operating a starbase (POS) | [optional] 
**offline** | **String** | Who can offline starbase (POS) and its structures | 
**online** | **String** | Who can online starbase (POS) and its structures | 
**unanchor** | **String** | Who can unanchor starbase (POS) and its structures | 
**useAllianceStandings** | **Boolean** | True if the starbase (POS) is using alliance standings, otherwise using corporation&#39;s | 


<a name="AnchorEnum"></a>
## Enum: AnchorEnum


* `alliance_member` (value: `"alliance_member"`)

* `config_starbase_equipment_role` (value: `"config_starbase_equipment_role"`)

* `corporation_member` (value: `"corporation_member"`)

* `starbase_fuel_technician_role` (value: `"starbase_fuel_technician_role"`)




<a name="FuelBayTakeEnum"></a>
## Enum: FuelBayTakeEnum


* `alliance_member` (value: `"alliance_member"`)

* `config_starbase_equipment_role` (value: `"config_starbase_equipment_role"`)

* `corporation_member` (value: `"corporation_member"`)

* `starbase_fuel_technician_role` (value: `"starbase_fuel_technician_role"`)




<a name="FuelBayViewEnum"></a>
## Enum: FuelBayViewEnum


* `alliance_member` (value: `"alliance_member"`)

* `config_starbase_equipment_role` (value: `"config_starbase_equipment_role"`)

* `corporation_member` (value: `"corporation_member"`)

* `starbase_fuel_technician_role` (value: `"starbase_fuel_technician_role"`)




<a name="OfflineEnum"></a>
## Enum: OfflineEnum


* `alliance_member` (value: `"alliance_member"`)

* `config_starbase_equipment_role` (value: `"config_starbase_equipment_role"`)

* `corporation_member` (value: `"corporation_member"`)

* `starbase_fuel_technician_role` (value: `"starbase_fuel_technician_role"`)




<a name="OnlineEnum"></a>
## Enum: OnlineEnum


* `alliance_member` (value: `"alliance_member"`)

* `config_starbase_equipment_role` (value: `"config_starbase_equipment_role"`)

* `corporation_member` (value: `"corporation_member"`)

* `starbase_fuel_technician_role` (value: `"starbase_fuel_technician_role"`)




<a name="UnanchorEnum"></a>
## Enum: UnanchorEnum


* `alliance_member` (value: `"alliance_member"`)

* `config_starbase_equipment_role` (value: `"config_starbase_equipment_role"`)

* `corporation_member` (value: `"corporation_member"`)

* `starbase_fuel_technician_role` (value: `"starbase_fuel_technician_role"`)




