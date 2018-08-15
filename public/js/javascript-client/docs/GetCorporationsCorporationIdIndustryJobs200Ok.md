# EveSwaggerInterface.GetCorporationsCorporationIdIndustryJobs200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**jobId** | **Number** | Unique job ID | 
**installerId** | **Number** | ID of the character which installed this job | 
**facilityId** | **Number** | ID of the facility where this job is running | 
**locationId** | **Number** | ID of the location for the industry facility | 
**activityId** | **Number** | Job activity ID | 
**blueprintId** | **Number** | blueprint_id integer | 
**blueprintTypeId** | **Number** | blueprint_type_id integer | 
**blueprintLocationId** | **Number** | Location ID of the location from which the blueprint was installed. Normally a station ID, but can also be an asset (e.g. container) or corporation facility | 
**outputLocationId** | **Number** | Location ID of the location to which the output of the job will be delivered. Normally a station ID, but can also be a corporation facility | 
**runs** | **Number** | Number of runs for a manufacturing job, or number of copies to make for a blueprint copy | 
**cost** | **Number** | The sume of job installation fee and industry facility tax | [optional] 
**licensedRuns** | **Number** | Number of runs blueprint is licensed for | [optional] 
**probability** | **Number** | Chance of success for invention | [optional] 
**productTypeId** | **Number** | Type ID of product (manufactured, copied or invented) | [optional] 
**status** | **String** | status string | 
**duration** | **Number** | Job duration in seconds | 
**startDate** | **Date** | Date and time when this job started | 
**endDate** | **Date** | Date and time when this job finished | 
**pauseDate** | **Date** | Date and time when this job was paused (i.e. time when the facility where this job was installed went offline) | [optional] 
**completedDate** | **Date** | Date and time when this job was completed | [optional] 
**completedCharacterId** | **Number** | ID of the character which completed this job | [optional] 
**successfulRuns** | **Number** | Number of successful runs for this job. Equal to runs unless this is an invention job | [optional] 


<a name="StatusEnum"></a>
## Enum: StatusEnum


* `active` (value: `"active"`)

* `cancelled` (value: `"cancelled"`)

* `delivered` (value: `"delivered"`)

* `paused` (value: `"paused"`)

* `ready` (value: `"ready"`)

* `reverted` (value: `"reverted"`)




