# EveSwaggerInterface.GetWarsWarIdOk

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** | ID of the specified war | 
**declared** | **Date** | Time that the war was declared | 
**started** | **Date** | Time when the war started and both sides could shoot each other | [optional] 
**retracted** | **Date** | Time the war was retracted but both sides could still shoot each other | [optional] 
**finished** | **Date** | Time the war ended and shooting was no longer allowed | [optional] 
**mutual** | **Boolean** | Was the war declared mutual by both parties | 
**openForAllies** | **Boolean** | Is the war currently open for allies or not | 
**aggressor** | [**GetWarsWarIdAggressor**](GetWarsWarIdAggressor.md) |  | 
**defender** | [**GetWarsWarIdDefender**](GetWarsWarIdDefender.md) |  | 
**allies** | [**[GetWarsWarIdAlly]**](GetWarsWarIdAlly.md) | allied corporations or alliances, each object contains either corporation_id or alliance_id | [optional] 


