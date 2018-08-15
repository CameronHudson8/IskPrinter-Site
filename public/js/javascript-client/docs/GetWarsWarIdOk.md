# EveSwaggerInterface.GetWarsWarIdOk

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**aggressor** | [**GetWarsWarIdAggressor**](GetWarsWarIdAggressor.md) |  | 
**allies** | [**[GetWarsWarIdAlly]**](GetWarsWarIdAlly.md) | allied corporations or alliances, each object contains either corporation_id or alliance_id | [optional] 
**declared** | **Date** | Time that the war was declared | 
**defender** | [**GetWarsWarIdDefender**](GetWarsWarIdDefender.md) |  | 
**finished** | **Date** | Time the war ended and shooting was no longer allowed | [optional] 
**id** | **Number** | ID of the specified war | 
**mutual** | **Boolean** | Was the war declared mutual by both parties | 
**openForAllies** | **Boolean** | Is the war currently open for allies or not | 
**retracted** | **Date** | Time the war was retracted but both sides could still shoot each other | [optional] 
**started** | **Date** | Time when the war started and both sides could shoot each other | [optional] 


