# EveSwaggerInterface.GetCorporationsCorporationIdIndustryJobs200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**activityId** | **Number** | Job activity ID | 
**blueprintId** | **Number** | blueprint_id integer | 
**blueprintLocationId** | **Number** | Location ID of the location from which the blueprint was installed. Normally a station ID, but can also be an asset (e.g. container) or corporation facility | 
**blueprintTypeId** | **Number** | blueprint_type_id integer | 
**completedCharacterId** | **Number** | ID of the character which completed this job | [optional] 
**completedDate** | **Date** | Date and time when this job was completed | [optional] 
**cost** | **Number** | The sume of job installation fee and industry facility tax | [optional] 
**duration** | **Number** | Job duration in seconds | 
**endDate** | **Date** | Date and time when this job finished | 
**facilityId** | **Number** | ID of the facility where this job is running | 
**installerId** | **Number** | ID of the character which installed this job | 
**jobId** | **Number** | Unique job ID | 
**licensedRuns** | **Number** | Number of runs blueprint is licensed for | [optional] 
**locationId** | **Number** | ID of the location for the industry facility | 
**outputLocationId** | **Number** | Location ID of the location to which the output of the job will be delivered. Normally a station ID, but can also be a corporation facility | 
**pauseDate** | **Date** | Date and time when this job was paused (i.e. time when the facility where this job was installed went offline) | [optional] 
**probability** | **Number** | Chance of success for invention | [optional] 
**productTypeId** | **Number** | Type ID of product (manufactured, copied or invented) | [optional] 
**runs** | **Number** | Number of runs for a manufacturing job, or number of copies to make for a blueprint copy | 
**startDate** | **Date** | Date and time when this job started | 
**status** | **String** | status string | 
**successfulRuns** | **Number** | Number of successful runs for this job. Equal to runs unless this is an invention job | [optional] 


<a name="StatusEnum"></a>
## Enum: StatusEnum


* `active` (value: `"active"`)

* `cancelled` (value: `"cancelled"`)

* `delivered` (value: `"delivered"`)

* `paused` (value: `"paused"`)

* `ready` (value: `"ready"`)

* `reverted` (value: `"reverted"`)




