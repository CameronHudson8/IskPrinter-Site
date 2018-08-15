# EveSwaggerInterface.GetCorporationsCorporationIdCustomsOffices200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**officeId** | **Number** | unique ID of this customs office | 
**systemId** | **Number** | ID of the solar system this customs office is located in | 
**reinforceExitStart** | **Number** | Together with reinforce_exit_end, marks a 2-hour period where this customs office could exit reinforcement mode during the day after initial attack | 
**reinforceExitEnd** | **Number** | reinforce_exit_end integer | 
**corporationTaxRate** | **Number** | corporation_tax_rate number | [optional] 
**allowAllianceAccess** | **Boolean** | allow_alliance_access boolean | 
**allianceTaxRate** | **Number** | Only present if alliance access is allowed | [optional] 
**allowAccessWithStandings** | **Boolean** | standing_level and any standing related tax rate only present when this is true | 
**standingLevel** | **String** | Access is allowed only for entities with this level of standing or better | [optional] 
**excellentStandingTaxRate** | **Number** | Tax rate for entities with excellent level of standing, only present if this level is allowed, same for all other standing related tax rates | [optional] 
**goodStandingTaxRate** | **Number** | good_standing_tax_rate number | [optional] 
**neutralStandingTaxRate** | **Number** | neutral_standing_tax_rate number | [optional] 
**badStandingTaxRate** | **Number** | bad_standing_tax_rate number | [optional] 
**terribleStandingTaxRate** | **Number** | terrible_standing_tax_rate number | [optional] 


<a name="StandingLevelEnum"></a>
## Enum: StandingLevelEnum


* `bad` (value: `"bad"`)

* `excellent` (value: `"excellent"`)

* `good` (value: `"good"`)

* `neutral` (value: `"neutral"`)

* `terrible` (value: `"terrible"`)




