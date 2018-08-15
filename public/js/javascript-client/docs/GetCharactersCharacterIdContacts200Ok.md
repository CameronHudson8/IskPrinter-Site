# EveSwaggerInterface.GetCharactersCharacterIdContacts200Ok

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**contactId** | **Number** | contact_id integer | 
**contactType** | **String** | contact_type string | 
**isBlocked** | **Boolean** | Whether this contact is in the blocked list. Note a missing value denotes unknown, not true or false | [optional] 
**isWatched** | **Boolean** | Whether this contact is being watched | [optional] 
**labelIds** | **[Number]** | label_ids array | [optional] 
**standing** | **Number** | Standing of the contact | 


<a name="ContactTypeEnum"></a>
## Enum: ContactTypeEnum


* `character` (value: `"character"`)

* `corporation` (value: `"corporation"`)

* `alliance` (value: `"alliance"`)

* `faction` (value: `"faction"`)




